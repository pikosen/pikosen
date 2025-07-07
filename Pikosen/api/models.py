from django.db import models
from django.contrib.auth.models import User

GENDER_CHOICES = {
    "FEMALE": "Female",
    "MALE": "Male",
    }

# Create your models here.
class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    name = models.CharField(max_length=32)
    gender = models.CharField(max_length=8, null=True, blank=True, choices=GENDER_CHOICES)
    age = models.SmallIntegerField(null=True, blank=True)
    contact = models.BigIntegerField()
    profilePhoto = models.ImageField(upload_to="profile_photo/", default="profile_photo/generic_profile.jpg", null=True, blank=True)
    isOwner = models.BooleanField(default=0, null=True, blank=True)

    def __str__ (self):
        return f"{self.pk}"

class Business(models.Model):
    owner = models.ForeignKey(Account, on_delete=models.CASCADE)
    businessName = models.CharField(max_length = 64)
    businessDescription = models.CharField(max_length=256)
    businessContact = models.BigIntegerField()
    businessLogo = models.ImageField(upload_to="business_logo/", default="business_logo/generic_logo.jpg", null=True, blank=True)
    
class Address(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE, null=True, blank=True)
    houseNumber = models.CharField(max_length=32)
    street = models.CharField(max_length=256)
    barangay = models.CharField(max_length=256)
    city = models.CharField(max_length=256)
    province = models.CharField(max_length=256)
    postalCode = models.IntegerField()

class Product(models.Model):
    business = models.ForeignKey(Business, on_delete=models.CASCADE)
    productName = models.CharField(max_length=128)
    price = models.BigIntegerField()
    stock = models.IntegerField(default=0)
    description = models.TextField(null=True, blank=True)
    origin = models.CharField(max_length=256, null=True, blank=True)
    type = models.CharField(max_length=256, null=True, blank=True)
    grams = models.IntegerField()
    mainImg = models.ImageField(upload_to="product_img", default="product_img/generic_product.jpg", null=True, blank=True)

class Images(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    image1 = models.ImageField(upload_to="product_img", null=True, blank=True)
    image2 = models.ImageField(upload_to="product_img", null=True, blank=True)
    image3 = models.ImageField(upload_to="product_img", null=True, blank=True)
    image4 = models.ImageField(upload_to="product_img", null=True, blank=True)

class Cart(models.Model):
    customer = models.ForeignKey(Account, on_delete=models.CASCADE)
    item = models.ManyToManyField(Product, blank=True)
    isOrdered = models.BooleanField(default=0, blank=True)
    isDelivered = models.BooleanField(default=0, blank=True)
