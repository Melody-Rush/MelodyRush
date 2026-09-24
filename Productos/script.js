// Arreglo de productos usando las imágenes de tu carpeta Home/img
const productos = [
    { id: 1, nombre: "Baby Album", precio: 15000, imagen: "../Home/img/baby.webp" },
    { id: 2, nombre: "Daft Punk", precio: 25000, imagen: "../Home/img/daft.webp" },
    { id: 3, nombre: "Post Malone", precio: 18000, imagen: "../Home/img/post.webp" },
    { id: 4, nombre: "Falling Album", precio: 12000, imagen: "../Home/img/Falling.webp" },
    { id: 5, nombre: "Olivia Rodrigo", precio: 22000, imagen: "../Home/img/olivia.webp" },
    { id: 6, nombre: "Michael Jackson", precio: 30000, imagen: "../Home/img/michael.webp" },
    { id: 7, nombre: "Guns N' Roses", precio: 28000, imagen: "../Home/img/guns.webp" },
    { id: 8, nombre: "Linkin Park", precio: 20000, imagen: "../Home/img/linkin1.webp" }
];

function renderizarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;
    
    contenedor.innerHTML = "";
    productos.forEach(prod => {
        const div = document.createElement('div');
        // Se agregan ambas clases para mantener compatibilidad total con CSS
        div.classList.add('tarjeta-producto', 'producto');
        div.innerHTML = `
            <img src="${prod.imagen}" alt="${prod.nombre}">
            <h3 class="productoti">${prod.nombre}</h3>
            <div class="info">
                <span>Álbum</span>
                <span>$${prod.precio.toLocaleString('es-CL')}</span>
            </div>
            <button onclick="agregarAlCarrito(${prod.id})">
                Añadir al carrito
            </button>
        `;
        contenedor.appendChild(div);
    });
}

function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = productos.find(p => p.id === id);
    
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    alert(`${producto.nombre} añadido al carrito`);
}

function actualizarContador() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('cart-count');
    if (contador) {
        contador.textContent = carrito.length;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarContador();
});