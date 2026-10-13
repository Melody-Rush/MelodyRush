// ==========================================
// MELODY RUSH - JavaScript para Django
// ==========================================

// 1. Filtrar directamente las tarjetas HTML renderizadas por Django en el DOM
function aplicarFiltros() {
    const textoBusqueda = document.getElementById('buscador')?.value.toLowerCase().trim() || '';
    const categoriaSeleccionada = document.getElementById('filtro-categoria')?.value || 'Todos';

    const tarjetas = document.querySelectorAll('#contenedor-productos .tarjeta-producto');

    tarjetas.forEach(tarjeta => {
        const textoTarjeta = tarjeta.textContent.toLowerCase();
        const categoriaBadge = tarjeta.querySelector('.categoria-badge')?.textContent.trim() || '';

        const coincideTexto = textoTarjeta.includes(textoBusqueda);
        const coincideCategoria = (categoriaSeleccionada === 'Todos') || (categoriaBadge === categoriaSeleccionada);

        if (coincideTexto && coincideCategoria) {
            tarjeta.style.display = '';
        } else {
            tarjeta.style.display = 'none';
        }
    });
}

// 2. Gestión del Carrito en LocalStorage
function agregarAlCarrito(id, cantidad = 1) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const idNum = parseInt(id);

    const indiceExistente = carrito.findIndex(item => item.id === idNum);

    if (indiceExistente !== -1) {
        carrito[indiceExistente].cantidad += cantidad;
    } else {
        carrito.push({
            id: idNum,
            cantidad: cantidad
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    alert(`¡Añadiste ${cantidad} producto(s) al carrito!`);
}

function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('cart-count');
    if (contador) {
        const totalItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
        contador.textContent = totalItems;
    }
}

// 3. Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();

    const buscador = document.getElementById('buscador');
    const filtroCat = document.getElementById('filtro-categoria');

    if (buscador && filtroCat) {
        buscador.addEventListener('input', aplicarFiltros);
        filtroCat.addEventListener('change', aplicarFiltros);
    }
});