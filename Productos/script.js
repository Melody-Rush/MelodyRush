// 1. Crear un arreglo de productos
// Asegurarse de que los nombres de las imágenes coincidan con los que tienes en GitHub
const productos = [
    { id: 1, nombre: "Guitarra Acústica", precio: 150000, imagen: "../Home/img/producto1.jpg" },
    { id: 2, nombre: "Teclado MIDI", precio: 85000, imagen: "../Home/img/producto2.jpg" },
    { id: 3, nombre: "Audífonos de Estudio", precio: 45000, imagen: "../Home/img/producto3.png" },
    
];

// 2. Mostrar los productos del arreglo en el HTML
const contenedorProductos = document.getElementById('contenedor-productos');

function renderizarProductos() {
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('tarjeta-producto');
        
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>$${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
        `;
        contenedorProductos.appendChild(div);
    });
}

// 3. Lógica para añadir un producto al carrito guardando en LocalStorage
function agregarAlCarrito(idProducto) {
    const productoSeleccionado = productos.find(p => p.id === idProducto);
    
    // Obtener carrito actual desde LocalStorage o crear arreglo vacío
    let carrito = JSON.parse(localStorage.getItem('carritoTienda')) || [];
    
    // Revisar si ya está en el carrito para aumentar cantidad
    const existe = carrito.find(p => p.id === idProducto);
    if(existe) {
        existe.cantidad += 1;
    } else {
        carrito.push({...productoSeleccionado, cantidad: 1});
    }
    
    // Guardar información en LOCALSTORAGE
    localStorage.setItem('carritoTienda', JSON.stringify(carrito));
    
    // Actualizar contador visual
    actualizarContadorCarrito();
    alert(`¡${productoSeleccionado.nombre} añadido al carrito!`);
}

// Inicializar la vista
renderizarProductos();