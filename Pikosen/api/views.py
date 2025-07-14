from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CreateAccountView(generics.CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

class ListProductView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

class CreateBusinessView(generics.CreateAPIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    permission_classes = [IsAuthenticated]

class BusinessView(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessViewSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = self.request.user
        business = self.queryset.filter(owner__user=user)
        serializer = self.serializer_class(business, many=True)
        return Response(serializer.data)

class InputAddressView(generics.CreateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

class BeanShopView(viewsets.ReadOnlyModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    permission_classes = [AllowAny]

class UserAccountView(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class BeanShopProductsView(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

class AddToCartView(generics.CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

# Updated views.py - Replace your ProductDashView with this:

class ProductDashView(viewsets.ModelViewSet):  # Changed from ReadOnlyModelViewSet to ModelViewSet
    queryset = Product.objects.all()
    serializer_class = ProductDashSerializer
    permission_classes = [IsAuthenticated]  # Changed from AllowAny to IsAuthenticated

    def list(self, request):
        user = self.request.user
        products = self.queryset.filter(business__owner__user=user)
        serializer = self.serializer_class(products, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        serializer = self.serializer_class(product)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        serializer = self.serializer_class(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = 400)
        
    def destroy(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        product.delete()
        return Response(status=204)
    
class AccountDashView(viewsets.ViewSet):  # Changed from ReadOnlyModelViewSet to ModelViewSet
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [AllowAny]  # Changed from AllowAny to IsAuthenticated

    def list(self, request):
        user = self.request.user
        queryset = self.queryset.filter(user = user.id)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        serializer = self.serializer_class(product)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        serializer = self.serializer_class(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status = 400)
        
    def destroy(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        product.delete()
        return Response(status=204)
    
class LoginView(APIView):
       def post(self, request):
           username = request.data.get('username')
           password = request.data.get('password')
           user = authenticate(username=username, password=password)
           if user:
               refresh = RefreshToken.for_user(user)
               return Response({
                   'refresh': str(refresh),
                   'access': str(refresh.access_token),
                   'user': UserSerializer(user).data
               })
           return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
       
