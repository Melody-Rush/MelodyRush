/* FUNCIONES GENERALES DE VALIDACION */

function mostrarError(elemento, mensaje){   //mostrar un mensaje de error
    elemento.textContent=mensaje;
}
function limpiarError(elemento){            //limpiar mensaje de error
    elemento.textContent="";
}
function estaVacio(valor){                  //para ver si un campo de text esta vacio
    return valor.trim() === "";
}
function superaMaximo(valor, maximo){       //ver si un texto supera max de caracteres.
    return valor.length>maximo;
}
function longitudEntre(valor, minimo, maximo){           //para ver si esta dentro del rango
    return valor.length>= minimo && valor.length<=maximo;
}
//para verificar el domino permitido
function correoPermitido(correo){
    const patronCorreo= /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return patronCorreo.test(correo);
}

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

function renderizarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    if (!contenedor) return;

    // Detecta si la página actual está dentro de la carpeta "Productos"
    const esPaginaProductos = window.location.pathname.toLowerCase().includes('productos');
    
    // Si está en productos.html busca en ../Home/img/, si está en index.html busca en img/
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
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContador();
        alert(`${producto.nombre} añadido al carrito`);
    }
}

function actualizarContador() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('cart-count');
    if (contador) {
        contador.textContent = carrito.length;
    }
}

// Ejecución segura al cargar el DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderizarProductos();
        actualizarContador();
    });
} else {
    renderizarProductos();
    actualizarContador();
}