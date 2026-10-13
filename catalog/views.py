from django.shortcuts import render, get_object_or_404
from .models import Product

def home(request):
    # Trae los primeros 4 productos para la portada
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
