# urls.py
from django.urls import path
from . import views
from .views import CategoryList, CategoryDetail, UserRegistration, UserLogin, ProductReviews, CheckAuth, CurrentUserView, UserDetail, CreateOrder

urlpatterns = [
    path('api/products/', views.ProductList.as_view(), name='product-list'),
    path('api/products/<int:pk>/', views.ProductDetail.as_view(), name='product-detail'),  # Новый маршрут
    path('api/categories/', CategoryList.as_view(), name='category-list'),
    path('api/categories/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
    path('api/register/', UserRegistration.as_view(), name='user-registration'),
    path('api/login/', UserLogin.as_view(), name='user-login'),
    path('api/products/<int:product_id>/reviews/', ProductReviews.as_view(), name='product_reviews'),
    path('api/check-auth/', CheckAuth.as_view(), name='check-auth'),
    path('api/logout/', views.Logout.as_view(), name='logout'),
    path('api/current_user/', CurrentUserView.as_view(), name='current-user'),  # Новый маршрут
    path('api/products/<int:product_id>/reviews/', views.ProductReviews.as_view(), name='product_reviews'),
    path('api/users/<int:user_id>/', UserDetail.as_view(), name='user_detail'),
    path('api/cart/', views.CartList.as_view(), name='cart-list'),
    path('api/cart/<int:pk>/', views.CartDetail.as_view(), name='cart-detail'),
    path('api/presentations-and-docs/', views.PresentationsAndDocsList.as_view(), name='presentations-and-docs-list'),
    path('api/presentations-and-docs/<int:pk>/', views.PresentationsAndDocsDetail.as_view(), name='presentations-and-docs-detail'),
    path('api/orders/', CreateOrder.as_view(), name='create-order'),
]
