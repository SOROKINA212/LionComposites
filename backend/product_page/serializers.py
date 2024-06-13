# serializers.py
from rest_framework import serializers
from .models import Product, Category, CustomUser, Review, Cart, PresentationsAndDocs, Slider, PrivacyPolicy


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password', 'email', 'name', 'second_name', 'phone_number']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'name': {'required': True},
            'second_name': {'required': True},
            'phone_number': {'required': True},
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'user', 'product', 'content']


    def create(self, validated_data):
        # Получаем объект пользователя из данных отзыва
        user = validated_data.pop('user')
        # Получаем id пользователя
        user_id = user.id
        # Создаем отзыв, связанный с этим пользователем
        review = Review.objects.create(user_id=user_id, **validated_data)
        return review


class CartSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Cart
        fields = ['id', 'user', 'product', 'quantity']

    def create(self, validated_data):
        product = validated_data.pop('product')
        cart_item = Cart.objects.create(product=product, **validated_data)
        return cart_item

    def update(self, instance, validated_data):
        instance.quantity = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance


class PresentationsAndDocsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PresentationsAndDocs
        fields = ['id', 'name', 'description', 'file', 'image']


class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = ['id', 'image', 'order']

class PrivacyPolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivacyPolicy
        fields = ['file']