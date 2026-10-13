from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

# ==========================================
# 1. VISTAS HTML TRADICIONALES (Se conservan)
# ==========================================
def home(request):
    destacados = Product.objects.all()[:4]
    return render(request, 'catalog/index.html', {'destacados': destacados})

def lista_productos(request):
    productos = Product.objects.all()
    return render(request, 'catalog/productos.html', {'productos': productos})

def detalle_producto(request, product_id):
    producto = get_object_or_404(Product, pk=product_id)
    relacionados = Product.objects.filter(category=producto.category).exclude(id=producto.id)[:4]
    return render(request, 'catalog/detalle-producto.html', {
        'producto': producto,
        'relacionados': relacionados
    })

def nosotros(request):
    return render(request, 'catalog/nosotros.html')

def blogs(request):
    return render(request, 'catalog/noticias.html')

def contacto(request):
    return render(request, 'catalog/contacto.html')

def carrito(request):
    return render(request, 'catalog/carrito.html')

def login_view(request):
    return render(request, 'catalog/login.html')

def registro_view(request):
    return render(request, 'catalog/registro.html')


# ==========================================
# 2. ENDPOINTS PARA REACT (API - JSON)
# ==========================================

# Retorna la lista completa de productos para la tienda en React
@api_view(['GET'])
def api_productos(request):
    productos = Product.objects.all()
    serializer = ProductSerializer(productos, many=True)
    return Response(serializer.data)

# Retorna el detalle de un solo producto según su ID
@api_view(['GET'])
def api_detalle_producto(request, product_id):
    producto = get_object_or_404(Product, pk=product_id)
    serializer = ProductSerializer(producto)
    return Response(serializer.data)