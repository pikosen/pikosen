from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view
from rest_framework import viewsets

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ListProductView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

class CreateBusinessView(generics.CreateAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]

class InputAddressView(generics.CreateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [AllowAny]

class BeanShopView(viewsets.ReadOnlyModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]

class BusinessView(viewsets.ReadOnlyModelViewSet):
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        return Business.objects.filter(Account=user.Account).first()
    
class AccountView(viewsets.ReadOnlyModelViewSet):
    serializer_class = AccountSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        return Account.objects.filter(Account=user.Account).first()