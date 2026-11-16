from django.db import models
from django.contrib.auth.models import User


# 1. EXTENSIÓN DE USUARIO PARA ROLES (ADMIN, VENDEDOR, CLIENTE)
class PerfilUsuario(models.Model):
    ROLES = [
        ('ADMIN', 'Administrador'),
        ('VENDEDOR', 'Vendedor'),
        ('CLIENTE', 'Cliente'),
    ]

    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil')
    rol = models.CharField(max_length=20, choices=ROLES, default='CLIENTE')
    region = models.CharField(max_length=100, default='Metropolitana', blank=True)
    comuna = models.CharField(max_length=100, default='Santiago', blank=True)

    def __str__(self):
        return f"{self.usuario.username} ({self.rol})"


# 2. TABLA CATEGORIA
class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True, verbose_name="Nombre Categoría")
    descripcion = models.TextField(blank=True, null=True, verbose_name="Descripción")

    def __str__(self):
        return self.nombre


# 3. TABLA PRODUCTO (Compatibilidad con campo category anterior + ForeignKey relacional)
class Product(models.Model):
    CATEGORIAS = [
        ('CD', 'CD'),
        ('Vinilo', 'Vinilo'),
        ('Cassette', 'Cassette'),
        ('Tocadiscos', 'Tocadiscos'),
        ('Toca CD', 'Toca CD'),
        ('Reproductor Cassette', 'Reproductor Cassette'),
    ]

    code = models.CharField(max_length=50, unique=True, verbose_name="Código")
    name = models.CharField(max_length=150, verbose_name="Nombre del Producto")
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='productos',
        verbose_name="Categoría Relacional"
    )
    category = models.CharField(max_length=50, choices=CATEGORIAS, default='Vinilo', verbose_name="Categoría")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Precio")
    stock = models.PositiveIntegerField(default=0, verbose_name="Stock")
    description = models.TextField(blank=True, null=True, verbose_name="Descripción")
    image = models.ImageField(upload_to='products/', blank=True, null=True, verbose_name="Imagen del Producto")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")

    def save(self, *args, **kwargs):
        # Mantiene sincronizado el texto de categoría con la tabla Categoria
        if self.categoria:
            self.category = self.categoria.nombre
        elif self.category:
            cat_obj, _ = Categoria.objects.get_or_create(nombre=self.category)
            self.categoria = cat_obj
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.code})"


# 4. TABLA BOLETA (Órdenes de compra)
class Boleta(models.Model):
    ESTADOS = [
        ('PENDIENTE', 'Pendiente'),
        ('PAGADA', 'Pagada'),
        ('DESPACHADA', 'Despachada'),
        ('ENTREGADA', 'Entregada'),
    ]

    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='boletas')
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='PAGADA')
    direccion_envio = models.CharField(max_length=255, blank=True, default='Retiro en tienda')

    def __str__(self):
        return f"Boleta #{self.id} - ${self.total} ({self.estado})"


# 5. TABLA DETALLE_BOLETA (Ítems de cada compra)
class DetalleBoleta(models.Model):
    boleta = models.ForeignKey(Boleta, on_delete=models.CASCADE, related_name='detalles')
    producto = models.ForeignKey(Product, on_delete=models.PROTECT)
    cantidad = models.PositiveIntegerField(default=1)
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)

    def save(self, *args, **kwargs):
        self.subtotal = self.cantidad * self.precio_unitario
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.cantidad}x {self.producto.name} (Boleta #{self.boleta.id})"