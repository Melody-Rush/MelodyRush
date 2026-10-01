/* ==========================================
   1. FUNCIONES GENERALES DE VALIDACIÓN
   ========================================== */
function mostrarError(inputElemento, spanError, mensaje) {
    inputElemento.classList.add("input-error");
    spanError.textContent = `⚠️ ${mensaje}`;
}

function limpiarError(inputElemento, spanError) {
    inputElemento.classList.remove("input-error");
    spanError.textContent = "";
}

function estaVacio(valor) {
    return valor.trim() === "";
}

function superaMaximo(valor, maximo) {
    return valor.length > maximo;
}

function longitudEntre(valor, minimo, maximo) {
    return valor.length >= minimo && valor.length <= maximo;
}

function correoPermitido(correo) {
    const patronCorreo = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return patronCorreo.test(correo);
}


/* ==========================================
   2. LISTA DE PRODUCTOS
   ========================================== */
const productos = [
    { id: 1, nombre: "Baby Album", precio: 15000, imagen: "baby.webp" },
    { id: 2, nombre: "Daft Punk", precio: 25000, imagen: "daft.webp" },
    { id: 3, nombre: "Post Malone", precio: 18000, imagen: "post.webp" },
    { id: 4, nombre: "Falling Album", precio: 12000, imagen: "Falling.webp" },
    { id: 5, nombre: "Olivia Rodrigo", precio: 22000, imagen: "olivia.webp" },
    { id: 6, nombre: "Michael Jackson", precio: 30000, imagen: "michael.webp" },
    { id: 7, nombre: "Guns N' Roses", precio: 28000, imagen: "guns.webp" },
    { id: 8, nombre: "Linkin Park", precio: 20000, imagen: "linkin1.webp" }
];


/* ==========================================
   3. LÓGICA DE PRODUCTOS Y CARRITO
   ========================================== */
function renderizarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return; // Si la página actual no tiene catálogo, no hace nada

    const esPaginaProductos = window.location.pathname.toLowerCase().includes('productos');
    const rutaImg = esPaginaProductos ? '../Home/img/' : 'img/';

    contenedor.innerHTML = "";
    productos.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'producto tarjeta-producto';
        div.innerHTML = `
            <img src="${rutaImg}${prod.imagen}" alt="${prod.nombre}">
            <a href="#" class="productoti">${prod.nombre}</a>
            <div class="info">
                <span>Álbum</span>
                <span>$${prod.precio.toLocaleString('es-CL')}</span>
            </div>
            <button onclick="agregarAlCarrito(${prod.id})">Añadir al carrito</button>
        `;
        contenedor.appendChild(div);
    });
}

function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = productos.find(p => p.id === id);

    if (producto) {
        // Aseguramos que la propiedad imagen guarde siempre el nombre limpio
        const productoAGuardar = {
            ...producto,
            imagen: producto.imagen.replace('../Home/img/', '').replace('img/', '')
        };

        carrito.push(productoAGuardar);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        actualizarContador();
        alert(`¡${producto.nombre} fue añadido al carrito!`);
    } else {
        console.error("Producto no encontrado con el ID:", id);
    }
}

function actualizarContador() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('cart-count');
    if (contador) {
        contador.textContent = carrito.length;
    }
}


/* ==========================================
   4. INICIALIZACIÓN
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarContador();
});