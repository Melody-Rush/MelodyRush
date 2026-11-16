from django.shortcuts import render, get_object_or_404
from django.db import transaction
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema

from .models import Product, Categoria, Boleta, DetalleBoleta, PerfilUsuario
from .serializers import (
    ProductSerializer,
    CategoriaSerializer,
    BoletaSerializer,
    CrearBoletaInputSerializer,
    LoginInputSerializer,
    UsuarioSerializer,
)
from .permissions import (
    obtener_rol_usuario,
    EsAdministrador,
    EsAdminOVendedor,
    LecturaPublicaEscrituraAdmin,
)


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
# 2. ENDPOINTS API REST v1 (JWT + CRUD)
# ==========================================

# --- AUTENTICACIÓN JWT ---
@extend_schema(request=LoginInputSerializer, tags=['Autenticación'])
@api_view(['POST', 'OPTIONS'])
@permission_classes([AllowAny])
@authentication_classes([])
def api_login(request):
    if request.method == 'OPTIONS':
        return Response(status=status.HTTP_200_OK)

    datos = request.data
    identificador = (datos.get('username') or datos.get('correo') or datos.get('run') or '').strip()
    password = datos.get('password', '')

    if not identificador or not password:
        return Response({'error': 'Debes ingresar RUN/Correo y contraseña.'}, status=status.HTTP_400_BAD_REQUEST)

    usuario_obj = (
        User.objects.filter(username__iexact=identificador).first()
        or User.objects.filter(email__iexact=identificador).first()
    )

    if usuario_obj:
        es_valida = usuario_obj.check_password(password) or (usuario_obj.password == password)

        if es_valida:
            if usuario_obj.password == password:
                usuario_obj.set_password(password)
                usuario_obj.save()

            # Asegura que exista perfil y determina rol
            perfil, _ = PerfilUsuario.objects.get_or_create(
                usuario=usuario_obj,
                defaults={'rol': 'ADMIN' if (usuario_obj.is_staff or usuario_obj.is_superuser) else 'CLIENTE'}
            )
            rol_actual = 'ADMIN' if (usuario_obj.is_staff or usuario_obj.is_superuser) else perfil.rol

            # Genera tokens JWT reales (Access + Refresh)
            refresh = RefreshToken.for_user(usuario_obj)
            refresh['rol'] = rol_actual
            refresh['username'] = usuario_obj.username

            return Response({
                'id': usuario_obj.id,
                'username': usuario_obj.username,
                'email': usuario_obj.email,
                'first_name': usuario_obj.first_name,
                'last_name': usuario_obj.last_name,
                'is_staff': rol_actual == 'ADMIN',
                'rol': rol_actual,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'token': str(refresh.access_token),  # Compatibilidad con frontend actual
            }, status=status.HTTP_200_OK)

    return Response({'error': 'Credenciales inválidas. Revisa tu usuario/correo y contraseña.'}, status=status.HTTP_401_UNAUTHORIZED)


# --- CATEGORÍAS (CRUD) ---
@extend_schema(request=CategoriaSerializer, responses=CategoriaSerializer(many=True), tags=['Categorías'])
@api_view(['GET', 'POST'])
@permission_classes([LecturaPublicaEscrituraAdmin])
def api_categorias(request):
    if request.method == 'GET':
        categorias = Categoria.objects.all()
        return Response(CategoriaSerializer(categorias, many=True).data)

    serializer = CategoriaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(request=CategoriaSerializer, responses=CategoriaSerializer, tags=['Categorías'])
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([LecturaPublicaEscrituraAdmin])
def api_detalle_categoria(request, categoria_id):
    categoria = get_object_or_404(Categoria, pk=categoria_id)
    if request.method == 'GET':
        return Response(CategoriaSerializer(categoria).data)
    elif request.method == 'PUT':
        serializer = CategoriaSerializer(categoria, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        categoria.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# --- PRODUCTOS (CRUD) ---
@extend_schema(request=ProductSerializer, responses=ProductSerializer(many=True), tags=['Productos'])
@api_view(['GET', 'POST'])
@permission_classes([LecturaPublicaEscrituraAdmin])
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


@extend_schema(request=ProductSerializer, responses=ProductSerializer, tags=['Productos'])
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([LecturaPublicaEscrituraAdmin])
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


# --- BOLETAS Y DETALLE_BOLETA (Lógica de Negocio + Descuento de Stock) ---
@extend_schema(request=CrearBoletaInputSerializer, responses=BoletaSerializer(many=True), tags=['Boletas / Órdenes'])
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def api_boletas(request):
    if request.method == 'GET':
        rol = obtener_rol_usuario(request.user)
        # Admin y Vendedor ven todas las órdenes; Cliente solo ve sus propias compras
        if rol in ['ADMIN', 'VENDEDOR']:
            boletas = Boleta.objects.all().order_by('-fecha')
        else:
            boletas = Boleta.objects.filter(usuario=request.user).order_by('-fecha')
        return Response(BoletaSerializer(boletas, many=True).data)

    elif request.method == 'POST':
        input_serializer = CrearBoletaInputSerializer(data=request.data)
        if not input_serializer.is_valid():
            return Response(input_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        items = input_serializer.validated_data['items']
        if not items:
            return Response({'error': 'El carrito no puede estar vacío.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            with transaction.atomic():
                boleta = Boleta.objects.create(
                    usuario=request.user,
                    direccion_envio=input_serializer.validated_data.get('direccion_envio', 'Despacho estándar'),
                    estado='PAGADA'
                )
                total_acumulado = 0

                for item in items:
                    producto = Product.objects.select_for_update().get(pk=item['producto_id'])
                    cantidad = item['cantidad']

                    if producto.stock < cantidad:
                        raise ValueError(f"Stock insuficiente para '{producto.name}'. Disponible: {producto.stock}")

                    # Descuento real de inventario
                    producto.stock -= cantidad
                    producto.save()

                    detalle = DetalleBoleta.objects.create(
                        boleta=boleta,
                        producto=producto,
                        cantidad=cantidad,
                        precio_unitario=producto.price,
                        subtotal=producto.price * cantidad
                    )
                    total_acumulado += detalle.subtotal

                boleta.total = total_acumulado
                boleta.save()

                return Response(BoletaSerializer(boleta).data, status=status.HTTP_201_CREATED)

        except Product.DoesNotExist:
            return Response({'error': 'Uno de los productos enviados no existe.'}, status=status.HTTP_404_NOT_FOUND)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(request=BoletaSerializer, responses=BoletaSerializer, tags=['Boletas / Órdenes'])
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def api_detalle_boleta(request, boleta_id):
    boleta = get_object_or_404(Boleta, pk=boleta_id)
    rol = obtener_rol_usuario(request.user)

    # Cliente solo puede consultar su propia boleta
    if rol == 'CLIENTE' and boleta.usuario != request.user:
        return Response({'error': 'No tienes permiso para ver esta boleta.'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'GET':
        return Response(BoletaSerializer(boleta).data)

    if rol not in ['ADMIN', 'VENDEDOR']:
        return Response({'error': 'Solo Administrador o Vendedor pueden modificar órdenes.'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'PUT':
        nuevo_estado = request.data.get('estado')
        if nuevo_estado:
            boleta.estado = nuevo_estado
            boleta.save()
        return Response(BoletaSerializer(boleta).data)

    elif request.method == 'DELETE':
        if rol != 'ADMIN':
            return Response({'error': 'Solo el Administrador puede eliminar boletas.'}, status=status.HTTP_403_FORBIDDEN)
        boleta.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# --- USUARIOS Y ROLES (CRUD) ---
def _serializar_usuario(u):
    perfil, _ = PerfilUsuario.objects.get_or_create(
        usuario=u,
        defaults={'rol': 'ADMIN' if (u.is_staff or u.is_superuser) else 'CLIENTE'}
    )
    rol_final = 'ADMIN' if (u.is_staff or u.is_superuser) else perfil.rol
    return {
        'id': u.id,
        'run': u.username,
        'nombre': u.first_name or u.username,
        'apellidos': u.last_name,
        'correo': u.email,
        'rol': rol_final,
        'region': perfil.region,
        'comuna': perfil.comuna,
    }


@extend_schema(request=UsuarioSerializer, responses=UsuarioSerializer(many=True), tags=['Usuarios'])
@api_view(['GET', 'POST'])
def api_usuarios(request):
    # GET solo permitido para ADMIN; POST abierto para registro de clientes nuevos
    if request.method == 'GET':
        if obtener_rol_usuario(request.user) != 'ADMIN':
            return Response({'error': 'Acceso restringido a Administradores.'}, status=status.HTTP_403_FORBIDDEN)
        usuarios = User.objects.all()
        return Response([_serializar_usuario(u) for u in usuarios])

    elif request.method == 'POST':
        datos = request.data
        username = (datos.get('run') or datos.get('correo') or '').strip()
        password = datos.get('password')

        if not username or not password:
            return Response({'error': 'RUN y contraseña son obligatorios.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username__iexact=username).exists():
            return Response({'run': ['Ya existe un usuario con este RUN/Usuario.']}, status=status.HTTP_400_BAD_REQUEST)

        rol_solicitado = datos.get('rol', 'CLIENTE')
        # Solo un ADMIN autenticado puede crear otro ADMIN o VENDEDOR; el registro público siempre crea CLIENTE
        if obtener_rol_usuario(request.user) != 'ADMIN':
            rol_solicitado = 'CLIENTE'

        user = User.objects.create_user(
            username=username,
            email=datos.get('correo', '').strip(),
            password=password,
            first_name=datos.get('nombre', '').strip(),
            last_name=datos.get('apellidos', '').strip(),
            is_staff=(rol_solicitado == 'ADMIN')
        )
        PerfilUsuario.objects.create(
            usuario=user,
            rol=rol_solicitado,
            region=datos.get('region', 'Metropolitana'),
            comuna=datos.get('comuna', 'Santiago')
        )

        return Response(_serializar_usuario(user), status=status.HTTP_201_CREATED)


@extend_schema(request=UsuarioSerializer, responses=UsuarioSerializer, tags=['Usuarios'])
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([EsAdministrador])
def api_detalle_usuario(request, user_id):
    usuario = get_object_or_404(User, pk=user_id)

    if request.method == 'GET':
        return Response(_serializar_usuario(usuario))

    elif request.method == 'PUT':
        datos = request.data
        usuario.first_name = datos.get('nombre', usuario.first_name)
        usuario.last_name = datos.get('apellidos', usuario.last_name)
        usuario.email = datos.get('correo', usuario.email)
        if datos.get('password'):
            usuario.set_password(datos.get('password'))

        perfil, _ = PerfilUsuario.objects.get_or_create(usuario=usuario)
        if 'rol' in datos:
            perfil.rol = datos['rol']
            usuario.is_staff = (datos['rol'] == 'ADMIN')
        if 'region' in datos:
            perfil.region = datos['region']
        if 'comuna' in datos:
            perfil.comuna = datos['comuna']

        usuario.save()
        perfil.save()
        return Response(_serializar_usuario(usuario))

    elif request.method == 'DELETE':
        usuario.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)