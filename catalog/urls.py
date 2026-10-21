from django.urls import path
from . import views

urlpatterns = [
    # Rutas HTML originales (Tradicionales)
    path('', views.home, name='home'),
    path('productos/', views.lista_productos, name='lista_productos'),
    path('productos/<int:product_id>/', views.detalle_producto, name='detalle_producto'),
    path('nosotros/', views.nosotros, name='nosotros'),
    path('blogs/', views.blogs, name='blogs'),
    path('contacto/', views.contacto, name='contacto'),
    path('carrito/', views.carrito, name='carrito'),
    path('login/', views.login_view, name='login'),
    path('registro/', views.registro_view, name='registro'),

    # Endpoints API REST (Para consumo de React)
    path('api/login/', views.api_login, name='api_login'), # NUEVO ENDPOINT PARA INICIO DE SESIÓN
    path('api/productos/', views.api_productos, name='api_productos'),
    path('api/productos/<int:product_id>/', views.api_detalle_producto, name='api_detalle_producto'),
    
    # NUEVOS ENDPOINTS DE USUARIOS:
    path('api/usuarios/', views.api_usuarios, name='api_usuarios'),
    path('api/usuarios/<int:user_id>/', views.api_detalle_usuario, name='api_detalle_usuario'),
]