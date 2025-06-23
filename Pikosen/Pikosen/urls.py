from django.contrib import admin
from django.urls import path, include
from api.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/', CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api/<int:Account>/productlisting/", ListProductView.as_view(), name="product_listing"),
    path("api/<int:Account>/createbusiness/", CreateBusinessView.as_view(), name="create_business"),
    path("api-auth/", include("rest_framework.urls")),
]