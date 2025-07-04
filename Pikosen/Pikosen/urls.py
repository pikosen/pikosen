from django.contrib import admin
from django.urls import path, include
from api.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('bean-shops/', BeanShopView.as_view({'get': 'list'}), name="home"),
    path('api/user/register/', CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api/<int:Account>/productlisting/", ListProductView.as_view(), name="product_listing"),
    path("api/<int:Account>/createbusiness/", CreateBusinessView.as_view(), name="create_business"),
    path("api/<int:Account>/address/", InputAddressView.as_view(), name="address"),
    path("api/business", BusinessView.as_view({'get': 'list'}), name="get_business"),
    path("api/account", AccountView.as_view({'get': 'list'}), name="get_account"),
    path("api-auth/", include("rest_framework.urls")),
    
]