
from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from .views import ProductDashView

urlpatterns = [
    path('bean-shops/', views.BeanShopView.as_view({'get': 'list'}), name="home"),
    path('user/register/', views.CreateUserView.as_view(), name="register"),
    path("createbusiness/", views.CreateBusinessView.as_view(), name="create_business"),
    path("productlisting/", views.ListProductView.as_view(), name="list_product"),
    path("getbusiness/", views.BusinessView.as_view({'get': 'list'}), name="get_business"),
    path("address/", views.InputAddressView.as_view(), name="input_address"),
    path("user/account/", views.CreateAccountView.as_view(), name="update_account"),
    path("dashboard/product/", views.ProductDashView.as_view({'get': 'list'}), name="dashproduct"),
    path("product/update/<int:pk>", views.ProductDashView.as_view({'put': 'update'}), name="update_product"),
    path("product/delete/<int:pk>", views.ProductDashView.as_view({'delete': 'destroy'}), name="delete_product"),
    path("dashboard/account/", views.AccountDashView.as_view({'get': 'list'}), name="dashaccount"),
]