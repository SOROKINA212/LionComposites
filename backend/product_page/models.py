from django.db import models
from django.contrib.auth.models import AbstractUser

class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='./category_images/', default='default_image.png')

    class Meta:
        app_label = 'product_page'

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    properties = models.CharField(max_length=255)
    description = models.TextField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    availability = models.BooleanField(default=True)
    comments = models.TextField(blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='./product_images/', default='default_image.png')

    class Meta:
        app_label = 'product_page'

    def __str__(self):
        return self.name


class CustomUser(AbstractUser):
    name = models.CharField(max_length=100)
    second_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return self.username


class Review(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    content = models.TextField()

    class Meta:
        app_label = 'product_page'


class Cart(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='cart')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='cart_items')
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        app_label = 'product_page'
        unique_together = ('user', 'product')

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"



class PresentationsAndDocs(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    file = models.FileField(upload_to='presentations_and_docs/')
    image = models.ImageField(upload_to='presentations_and_docs_images/', null=True, blank=True)

    class Meta:
        app_label = 'product_page'

    def __str__(self):
        return self.name

class Slider(models.Model):
    image = models.ImageField(upload_to='slider/', null=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Slider Image {self.order}"

class PrivacyPolicy(models.Model):
    file = models.FileField(upload_to='privacy_policy/', null=True, blank=True)

    def __str__(self):
        return 'Privacy Policy'