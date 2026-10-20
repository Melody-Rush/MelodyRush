from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
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

# --- PRODUCTOS ---

@api_view(['GET', 'POST'])
def api_productos(request):
    if request.method == 'GET':
        productos = Product.objects.all()
        serializer = ProductSerializer(productos, many=True)
        return Response(serializer.data)
        
    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def api_detalle_producto(request, product_id):
    producto = get_object_or_404(Product, pk=product_id)
    
    if request.method == 'GET':
        serializer = ProductSerializer(producto)
        return Response(serializer.data)
        
    elif request.method == 'PUT':
        serializer = ProductSerializer(producto, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'DELETE':
        producto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# --- USUARIOS ---

@api_view(['GET', 'POST'])
def api_usuarios(request):
    if request.method == 'GET':
        usuarios = User.objects.all()
        data = []
        for u in usuarios:
            data.append({
                'id': u.id,
                'run': u.username,
                'nombre': u.first_name or u.username,
                'apellidos': u.last_name,
                'correo': u.email,
                'region': 'Metropolitana',
                'comuna': 'Santiago'
            })
        return Response(data)
        
    elif request.method == 'POST':
        datos = request.data
        username = datos.get('run') or datos.get('correo')
        password = datos.get('password')
        
        if not username or not password:
            return Response({'error': 'RUN y contraseña son obligatorios.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({'run': ['Ya existe un usuario con este RUN/Usuario.']}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(
            username=username,
            email=datos.get('correo', ''),
            password=password,
            first_name=datos.get('nombre', ''),
            last_name=datos.get('apellidos', '')
        )
        
        return Response({
            'id': user.id,
            'run': user.username,
            'nombre': user.first_name,
            'apellidos': user.last_name,
            'correo': user.email
        }, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def api_detalle_usuario(request, user_id):
    usuario = get_object_or_404(User, pk=user_id)
    
    if request.method == 'GET':
        return Response({
            'id': usuario.id,
            'run': usuario.username,
            'nombre': usuario.first_name,
            'apellidos': usuario.last_name,
            'correo': usuario.email
        })
        
    elif request.method == 'PUT':
        datos = request.data
        usuario.first_name = datos.get('nombre', usuario.first_name)
        usuario.last_name = datos.get('apellidos', usuario.last_name)
        usuario.email = datos.get('correo', usuario.email)
        if datos.get('password'):
            usuario.set_password(datos.get('password'))
        usuario.save()
        
        return Response({
            'id': usuario.id,
            'run': usuario.username,
            'nombre': usuario.first_name,
            'apellidos': usuario.last_name,
            'correo': usuario.email
        })
        
    elif request.method == 'DELETE':
        usuario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)