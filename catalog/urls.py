from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
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

    # ==========================================
    # DOCUMENTACIÓN SWAGGER (Requisito Rúbrica)
    # ==========================================
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/v1/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    # ==========================================
    # ENDPOINTS API REST VERSIONADOS (/api/v1/)
    # ==========================================
    # Autenticación JWT
    path('api/v1/auth/login/', views.api_login, name='v1_api_login'),
    path('api/v1/auth/refresh/', TokenRefreshView.as_view(), name='v1_token_refresh'),

    # Categorías CRUD
    path('api/v1/categorias/', views.api_categorias, name='v1_api_categorias'),
    path('api/v1/categorias/<int:categoria_id>/', views.api_detalle_categoria, name='v1_api_detalle_categoria'),

    # Productos CRUD
    path('api/v1/productos/', views.api_productos, name='v1_api_productos'),
    path('api/v1/productos/<int:product_id>/', views.api_detalle_producto, name='v1_api_detalle_producto'),

    # Boletas / Órdenes CRUD
    path('api/v1/boletas/', views.api_boletas, name='v1_api_boletas'),
    path('api/v1/boletas/<int:boleta_id>/', views.api_detalle_boleta, name='v1_api_detalle_boleta'),

    # Usuarios y Roles CRUD
    path('api/v1/usuarios/', views.api_usuarios, name='v1_api_usuarios'),
    path('api/v1/usuarios/<int:user_id>/', views.api_detalle_usuario, name='v1_api_detalle_usuario'),

    # ==========================================
    # ALIAS RETROCOMPATIBLES (Para no romper React actual)
    # ==========================================
    path('api/login/', views.api_login, name='api_login'),
    path('api/productos/', views.api_productos, name='api_productos'),
    path('api/productos/<int:product_id>/', views.api_detalle_producto, name='api_detalle_producto'),
    path('api/usuarios/', views.api_usuarios, name='api_usuarios'),
    path('api/usuarios/<int:user_id>/', views.api_detalle_usuario, name='api_detalle_usuario'),
]