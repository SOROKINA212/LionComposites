# product_page/views.py

from rest_framework import generics
import logging
from django.db.models import Q
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Category, Review, CustomUser, Cart, PresentationsAndDocs  # Импортируем модель Review
from .serializers import ProductSerializer, CategorySerializer, CustomUserSerializer, ReviewSerializer, CartSerializer, PresentationsAndDocsSerializer  # Импортируем сериализатор отзывов
from django.contrib.auth import authenticate, login
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger(__name__)

class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(description__icontains=search_query) |
                Q(category__name__icontains=search_query)
            )
        return queryset

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_queryset(self):
        queryset = self.queryset
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(name__icontains=search_query)
        return queryset

class CategoryDetail(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class UserRegistration(APIView):
    def post(self, request):
        password = request.data.get('password')
        password_confirm = request.data.get('passwordConfirm')

        if password != password_confirm:
            raise ValidationError({'error': 'Passwords do not match'})

        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            serializer = CustomUserSerializer(user)

            # Устанавливаем токен в cookie
            response = JsonResponse({'token': token.key, 'user': serializer.data})
            response.set_cookie(key='auth_token', value=token.key, httponly=True, secure=True)
            return response
        else:
            return Response({'error': 'Неправильное имя пользователя или пароль'}, status=status.HTTP_401_UNAUTHORIZED)

class ProductReviews(APIView):
    def get(self, request, product_id):
        # Получаем продукт по его идентификатору
        product = Product.objects.get(pk=product_id)
        # Получаем отзывы, связанные с этим продуктом
        reviews = Review.objects.filter(product=product)
        # Сериализуем отзывы для отправки обратно клиенту
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)


class CheckAuth(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Если пользователь аутентифицирован, возвращаем информацию об этом
        return Response({'isAuthenticated': True}, status=status.HTTP_200_OK)

class Logout(APIView):
    permission_classes = [IsAuthenticated]  # Только аутентифицированные пользователи могут выходить

    def post(self, request):
        request.user.auth_token.delete()  # Удаляем токен пользователя
        return Response(status=status.HTTP_200_OK)

class CurrentUserView(APIView):
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            # Возвращаем информацию об аутентифицированном пользователе
            return Response(
                {'id': user.id, 'username': user.username, 'email': user.email, 'first_name': user.first_name,
                 'last_name': user.last_name, 'phone_number': user.phone_number})
        else:
            # Возвращаем ошибку, если пользователь не аутентифицирован
            return Response({'error': 'Пользователь не аутентифицирован'}, status=status.HTTP_401_UNAUTHORIZED)


class ProductReviews(APIView):
    def get(self, request, product_id):
        # Получаем продукт по его идентификатору
        product = Product.objects.get(pk=product_id)
        # Получаем отзывы, связанные с этим продуктом
        reviews = Review.objects.filter(product=product)
        # Сериализуем отзывы для отправки обратно клиенту
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request, product_id):
        data = request.data
        data['product'] = product_id  # Устанавливаем id продукта в данных отзыва
        data['user'] = request.user.id  # Устанавливаем id пользователя в данных отзыва
        serializer = ReviewSerializer(data=data, context={'request': request})  # Передаем контекст запроса в сериализатор
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    def get(self, request, user_id):
        user = get_object_or_404(CustomUser, id=user_id)
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)


class CartList(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CartDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()


class PresentationsAndDocsList(generics.ListCreateAPIView):
    queryset = PresentationsAndDocs.objects.all()
    serializer_class = PresentationsAndDocsSerializer

class PresentationsAndDocsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PresentationsAndDocs.objects.all()
    serializer_class = PresentationsAndDocsSerializer



class CreateOrder(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        cart_items = Cart.objects.filter(user=user)
        delivery_method = request.data.get('delivery_method')
        delivery_address = request.data.get('delivery_address')

        order_details = []
        total_price = 0

        for item in cart_items:
            order_details.append({
                'product_name': item.product.name,
                'quantity': item.quantity,
                'price': item.product.cost,
            })
            total_price += item.quantity * item.product.cost

        order_info = {
            'user': user.username,
            'items': order_details,
            'total_price': total_price,
            'delivery_method': delivery_method,
        }

        if delivery_method == 'delivery':
            order_info['delivery_address'] = delivery_address

        # 发送电子邮件
        subject = 'New Order Received'
        message = f"A new order has been placed:\n\n{order_info}"
        from_email = settings.EMAIL_HOST_USER
        to_email = settings.ADMIN_EMAIL
        send_mail(subject, message, from_email, [to_email], fail_silently=False)

        # 清空购物车
        cart_items.delete()

        return Response(order_info, status=status.HTTP_201_CREATED)