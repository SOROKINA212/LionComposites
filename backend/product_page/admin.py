from django.contrib import admin
from .models import Product, Category, CustomUser, Review, Cart, PresentationsAndDocs, Slider, PrivacyPolicy

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(CustomUser)
admin.site.register(Review)
admin.site.register(Cart)
admin.site.register(PresentationsAndDocs)
admin.site.register(Slider)
admin.site.register(PrivacyPolicy)

