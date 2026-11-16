from rest_framework.permissions import BasePermission, SAFE_METHODS


def obtener_rol_usuario(user):
    if not user or not user.is_authenticated:
        return 'INVITADO'
    if user.is_superuser or user.is_staff:
        return 'ADMIN'
    if hasattr(user, 'perfil'):
        return user.perfil.rol
    return 'CLIENTE'


class EsAdministrador(BasePermission):
    """Solo permite acceso total a usuarios con rol ADMIN."""
    def has_permission(self, request, view):
        return obtener_rol_usuario(request.user) == 'ADMIN'


class EsAdminOVendedor(BasePermission):
    """Permite acceso a ADMIN y VENDEDOR (ej. ver órdenes/boletas)."""
    def has_permission(self, request, view):
        return obtener_rol_usuario(request.user) in ['ADMIN', 'VENDEDOR']


class LecturaPublicaEscrituraAdmin(BasePermission):
    """Cualquiera puede ver catálogo (GET), pero solo ADMIN crea/edita/elimina."""
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return obtener_rol_usuario(request.user) == 'ADMIN'