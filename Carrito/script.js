document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
    actualizarContadorCarrito();
});

function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaCarrito = document.getElementById('lista-carrito');
    const carritoSubtotal = document.getElementById('carrito-subtotal');
    const carritoTotal = document.getElementById('carrito-total');

    // Si el carrito está vacío, mostramos un mensaje
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p class="carrito-vacio-msg">Tu carrito está vacío.</p>';
        carritoSubtotal.textContent = '$0';
        carritoTotal.textContent = '$0';
        return;
    }

    // Agrupar productos duplicados para calcular cantidades
    const productosAgrupados = {};
    carrito.forEach(prod => {
        if (productosAgrupados[prod.id]) {
            productosAgrupados[prod.id].cantidad++;
        } else {
            productosAgrupados[prod.id] = { ...prod, cantidad: 1 };
        }
    });

    listaCarrito.innerHTML = '';
    let total = 0;

    // Generar el HTML para cada producto agrupado
    Object.values(productosAgrupados).forEach(prod => {
        const subtotalProducto = prod.precio * prod.cantidad;
        total += subtotalProducto;

        // Ajuste de ruta de imagen: si se agregó desde index.html no tiene la carpeta, así que se la añadimos
        let rutaImagen = prod.imagen;
        if (!rutaImagen.includes('/')) {
            rutaImagen = '../Home/img/' + rutaImagen;
        }

        const div = document.createElement('div');
        div.className = 'carrito-item';
        div.innerHTML = `
            <img src="${rutaImagen}" alt="${prod.nombre}" class="carrito-item-img">
            <div class="carrito-item-info">
                <h4>${prod.nombre}</h4>
                <p class="carrito-item-precio">$${prod.precio.toLocaleString('es-CL')} x ${prod.cantidad}</p>
            </div>
            <div class="carrito-item-acciones" style="text-align: right;">
                <strong style="color: #1e1b4b; font-size: 16px;">$${subtotalProducto.toLocaleString('es-CL')}</strong>
                <br><br>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${prod.id})">Eliminar</button>
            </div>
        `;
        listaCarrito.appendChild(div);
    });

    // Actualizar los textos de precios totales
    carritoSubtotal.textContent = `$${total.toLocaleString('es-CL')}`;
    carritoTotal.textContent = `$${total.toLocaleString('es-CL')}`;
}

// Función para eliminar un producto específico del carrito
function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    // Filtramos el arreglo para dejar todos menos el que tenga el ID que queremos borrar
    carrito = carrito.filter(prod => prod.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    renderizarCarrito();
    actualizarContadorCarrito();
}

// Función para vaciar todo el carrito con un solo botón
function vaciarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) return;

    if (confirm('¿Estás seguro de que deseas vaciar tu carrito?')) {
        localStorage.removeItem('carrito');
        renderizarCarrito();
        actualizarContadorCarrito();
    }
}

// Función para actualizar el número rojo del ícono del carrito en el header
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('cart-count');
    if (contador) {
        contador.textContent = carrito.length;
    }
}

// Evento para el botón de "Procesar Pago"
const btnPagar = document.getElementById('btn-procesar-pago');
if (btnPagar) {
    btnPagar.addEventListener('click', () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito.length === 0) {
            alert('Tu carrito está vacío. Agrega productos antes de pagar.');
        } else {
            alert('¡Gracias por tu compra en Melody Rush! Redirigiendo a pasarela de pagos...');
            // Aquí en un proyecto real redirigirías a Webpay o similar.
            // Por ahora simularemos la compra vaciando el carrito:
            localStorage.removeItem('carrito');
            renderizarCarrito();
            actualizarContadorCarrito();
        }
    });
}