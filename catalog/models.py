from django.db import models

# Create your models here.

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
    category = models.CharField(max_length=50, choices=CATEGORIAS, default='Vinilo', verbose_name="Categoría")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Precio")
    stock = models.PositiveIntegerField(default=0, verbose_name="Stock")
    description = models.TextField(blank=True, null=True, verbose_name="Descripción")
    image = models.ImageField(upload_to='products/', blank=True, null=True, verbose_name="Imagen del Producto")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")

    def __str__(self):
        return f"{self.name} - {self.code}"