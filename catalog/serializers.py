from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Categoria, Boleta, DetalleBoleta, PerfilUsuario


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.CharField(source='categoria.nombre', read_only=True)

    class Meta:
        model = Product
        fields = '__all__'


class DetalleBoletaSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='producto.name', read_only=True)
    producto_codigo = serializers.CharField(source='producto.code', read_only=True)

    class Meta:
        model = DetalleBoleta
        fields = ['id', 'producto', 'producto_nombre', 'producto_codigo', 'cantidad', 'precio_unitario', 'subtotal']
        read_only_fields = ['precio_unitario', 'subtotal']


class BoletaSerializer(serializers.ModelSerializer):
    detalles = DetalleBoletaSerializer(many=True, read_only=True)
    usuario_nombre = serializers.CharField(source='usuario.username', read_only=True)

    class Meta:
        model = Boleta
        fields = ['id', 'usuario', 'usuario_nombre', 'fecha', 'total', 'estado', 'direccion_envio', 'detalles']
        read_only_fields = ['fecha', 'total']


class ItemCompraInputSerializer(serializers.Serializer):
    producto_id = serializers.IntegerField()
    cantidad = serializers.IntegerField(min_value=1)


class CrearBoletaInputSerializer(serializers.Serializer):
    direccion_envio = serializers.CharField(required=False, default='Despacho estándar')
    items = ItemCompraInputSerializer(many=True)


class LoginInputSerializer(serializers.Serializer):
    username = serializers.CharField(required=False)
    correo = serializers.EmailField(required=False)
    password = serializers.CharField()


class UsuarioSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    run = serializers.CharField()
    nombre = serializers.CharField()
    apellidos = serializers.CharField(required=False, allow_blank=True)
    correo = serializers.EmailField()
    password = serializers.CharField(write_only=True, required=False)
    rol = serializers.ChoiceField(choices=['ADMIN', 'VENDEDOR', 'CLIENTE'], default='CLIENTE')
    region = serializers.CharField(required=False, default='Metropolitana')
    comuna = serializers.CharField(required=False, default='Santiago')