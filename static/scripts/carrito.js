document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
    actualizarContadorCarrito();
});

function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaCarrito = document.getElementById('lista-carrito');
    const carritoSubtotal = document.getElementById('carrito-subtotal');
    const carritoTotal = document.getElementById('carrito-total');

    if (!listaCarrito) return;

    // Si el carrito está vacío
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p class="carrito-vacio-msg" style="text-align: center; color: #64748b; padding: 20px;">Tu carrito está vacío.</p>';
        if (carritoSubtotal) carritoSubtotal.textContent = '$0';
        if (carritoTotal) carritoTotal.textContent = '$0';
        return;
    }

    // Agrupar productos
    const productosAgrupados = {};
    carrito.forEach(prod => {
        const key = prod.id;
        if (productosAgrupados[key]) {
            productosAgrupados[key].cantidad += (prod.cantidad || 1);
        } else {
            productosAgrupados[key] = { 
                ...prod, 
                cantidad: prod.cantidad || 1 
            };
        }
    });

    listaCarrito.innerHTML = '';
    let total = 0;

    Object.values(productosAgrupados).forEach(prod => {
        const precioUnitario = prod.precio || prod.price || 0;
        const nombreProd = prod.nombre || prod.name || 'Producto';
        const subtotalProducto = precioUnitario * prod.cantidad;
        total += subtotalProducto;

        // Ruta de imagen adaptada para Django (archivos media o static)
        let rutaImagen = prod.imagen;
        if (!rutaImagen) {
            rutaImagen = '/static/img/no-image.png';
        } else if (!rutaImagen.startsWith('/') && !rutaImagen.startsWith('http')) {
            rutaImagen = '/static/img/' + rutaImagen;
        }

        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            <img src="${rutaImagen}" alt="${nombreProd}" class="carrito-item-img">
            <div class="carrito-item-info">
                <h4>${nombreProd}</h4>
                <p class="carrito-item-precio">$${precioUnitario.toLocaleString('es-CL')} x ${prod.cantidad}</p>
            </div>
            <div class="carrito-item-acciones" style="text-align: right;">
                <strong style="color: #1e1b4b; font-size: 16px;">$${subtotalProducto.toLocaleString('es-CL')}</strong>
                <br><br>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${prod.id})">Eliminar</button>
            </div>
        `;
        listaCarrito.appendChild(div);
    });

    if (carritoSubtotal) carritoSubtotal.textContent = `$${total.toLocaleString('es-CL')}`;
    if (carritoTotal) carritoTotal.textContent = `$${total.toLocaleString('es-CL')}`;
}

function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito = carrito.filter(prod => prod.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    renderizarCarrito();
    actualizarContadorCarrito();
}

function vaciarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) return;

    if (confirm('¿Estás seguro de que deseas vaciar tu carrito?')) {
        localStorage.removeItem('carrito');
        renderizarCarrito();
        actualizarContadorCarrito();
    }
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('cart-count');
    if (contador) {
        const totalItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
        contador.textContent = totalItems;
    }
}

// Evento de pago
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'btn-procesar-pago') {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de pagar.');
        } else {
            alert('¡Gracias por tu compra en Melody Rush! Redirigiendo a la pasarela de pagos...');
            localStorage.removeItem('carrito');
            renderizarCarrito();
            actualizarContadorCarrito();
        }
    }
});