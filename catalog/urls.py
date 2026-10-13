from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('productos/', views.lista_productos, name='lista_productos'),
    path('productos/<int:product_id>/', views.detalle_producto, name='detalle_producto'),
    path('nosotros/', views.nosotros, name='nosotros'),
    path('blogs/', views.blogs, name='blogs'),
    path('contacto/', views.contacto, name='contacto'),
    path('carrito/', views.carrito, name='carrito'),
    path('login/', views.login_view, name='login'),
    path('registro/', views.registro_view, name='registro'),
]