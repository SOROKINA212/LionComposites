from django.contrib import admin
from .models import Product, Category, CustomUser, Review

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(CustomUser)
admin.site.register(Review)

