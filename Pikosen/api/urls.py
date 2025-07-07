
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('bean-shops/', views.BeanShopView.as_view({'get': 'list'}), name="home"),
    path('user/register/', views.CreateUserView.as_view(), name="register"),
    path('user/login/', views.LoginView.as_view(), name="login"),
    path("productlisting/", views.ListProductView.as_view(), name="product_listing"),
    path("createbusiness/", views.CreateBusinessView.as_view(), name="create_business"),
    path("address/", views.InputAddressView.as_view(), name="input_address"),
    path("user/account/", views.CreateAccountView.as_view(), name="update_account"),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
]