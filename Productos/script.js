// 1. Catálogo ampliado con especificaciones exigidas (código, categoría, stock, descripción)
const productosOriginales = [
    { id: 1, codigo: "VIN-001", nombre: "Baby Metal", precio: 15000, imagen: "../Home/img/baby.webp", categoria: "Vinilo", stock: 15, descripcion: "Edición especial en vinilo del aclamado álbum de la banda de kawaii metal. Incluye arte exclusivo." },
    { id: 2, codigo: "CD-001", nombre: "Daft Punk", precio: 25000, imagen: "../Home/img/daft.webp", categoria: "CD", stock: 8, descripcion: "El legendario álbum Random Access Memories en formato CD de alta fidelidad." },
    { id: 3, codigo: "CD-002", nombre: "Post Malone", precio: 18000, imagen: "../Home/img/post.webp", categoria: "CD", stock: 20, descripcion: "Hollywood's Bleeding, una mezcla perfecta de hip hop y pop moderno." },
    { id: 4, codigo: "VIN-002", nombre: "Falling In Reverse", precio: 12000, imagen: "../Home/img/Falling.webp", categoria: "Vinilo", stock: 5, descripcion: "Vinilo de colección con los mayores éxitos de la banda de post-hardcore." },
    { id: 5, codigo: "CAS-001", nombre: "Olivia Rodrigo", precio: 22000, imagen: "../Home/img/olivia.webp", categoria: "Casete", stock: 12, descripcion: "Edición retro en casete del exitoso álbum debut Sour." },
    { id: 6, codigo: "VIN-003", nombre: "Michael Jackson", precio: 30000, imagen: "../Home/img/michael.webp", categoria: "Vinilo", stock: 3, descripcion: "Thriller en vinilo original restaurado. Una pieza obligatoria para coleccionistas." },
    { id: 7, codigo: "CD-003", nombre: "Guns N' Roses", precio: 28000, imagen: "../Home/img/guns.webp", categoria: "CD", stock: 25, descripcion: "Appetite for Destruction remasterizado en formato CD doble." },
    { id: 8, codigo: "VIN-004", nombre: "Linkin Park", precio: 20000, imagen: "../Home/img/linkin1.webp", categoria: "Vinilo", stock: 10, descripcion: "Meteora en vinilo. Revive el poder del nu-metal de los 2000." },
    { id: 9, codigo: "CD-004", nombre: "Red Hot Chili Peppers", precio: 18000, imagen: "../Home/img/redhot.webp", categoria: "CD", stock: 18, descripcion: "Californication en edición CD con libreto extendido." },
    { id: 10, codigo: "CAS-002", nombre: "The Weeknd", precio: 21000, imagen: "../Home/img/the_weeknd.webp", categoria: "Casete", stock: 7, descripcion: "After Hours en una exclusiva cinta de casete roja transparente." },
    { id: 11, codigo: "VIN-005", nombre: "Creedence Clearwater", precio: 23000, imagen: "../Home/img/the_creedence.jpg", categoria: "Vinilo", stock: 14, descripcion: "Recopilatorio Chronicle Vol. 1 en formato disco de vinilo clásico." },
    { id: 12, codigo: "CD-005", nombre: "Three Days Grace", precio: 16000, imagen: "../Home/img/three_days.webp", categoria: "CD", stock: 30, descripcion: "One-X, el álbum que definió una generación, disponible en CD." }
];

// 2. Renderizar grilla de productos (recibe un arreglo para permitir filtros)
function renderizarProductos(lista = productosOriginales, contenedorId = 'contenedor-productos', limite = null) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;
    
    contenedor.innerHTML = "";
    
    // Si se especificó un límite (ej. productos relacionados), recortamos
    const prodsA_Renderizar = limite ? lista.slice(0, limite) : lista;

    if (prodsA_Renderizar.length === 0) {
        contenedor.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #64748b;">No se encontraron productos con esos criterios.</p>`;
        return;
    }

    prodsA_Renderizar.forEach(prod => {
        const div = document.createElement('div');
        div.classList.add('tarjeta-producto', 'producto');
        div.innerHTML = `
            <a href="detalle-producto.html?id=${prod.id}" class="enlace-detalle">
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <span class="categoria-badge">${prod.categoria}</span>
                <h3 class="productoti">${prod.nombre}</h3>
            </a>
            <div class="info">
                <span>Stock: ${prod.stock}</span>
                <span>$${prod.precio.toLocaleString('es-CL')}</span>
            </div>
            <button onclick="agregarAlCarrito(${prod.id}, 1)">
                Añadir al carrito
            </button>
        `;
        contenedor.appendChild(div);
    });
}

// 3. Sistema de Filtros Combinados (Buscador texto + Selector categoría)
function aplicarFiltros() {
    const textoBusqueda = document.getElementById('buscador').value.toLowerCase();
    const categoriaSeleccionada = document.getElementById('filtro-categoria').value;

    const productosFiltrados = productosOriginales.filter(prod => {
        // Busca en nombre, descripción o código
        const coincideTexto = prod.nombre.toLowerCase().includes(textoBusqueda) || 
                              prod.descripcion.toLowerCase().includes(textoBusqueda) ||
                              prod.codigo.toLowerCase().includes(textoBusqueda);
        
        // Verifica la categoría
        const coincideCategoria = categoriaSeleccionada === "Todos" || prod.categoria === categoriaSeleccionada;

        return coincideTexto && coincideCategoria;
    });

    renderizarProductos(productosFiltrados, 'contenedor-productos');
}

// 4. Lógica para cargar dinámicamente el Detalle de Producto
function cargarDetalleProducto() {
    const nombreElement = document.getElementById('detalle-nombre');
    if (!nombreElement) return; // Salir si no estamos en detalle-producto.html

    const urlParams = new URLSearchParams(window.location.search);
    const idProducto = parseInt(urlParams.get('id'));

    const producto = productosOriginales.find(p => p.id === idProducto);

    if (producto) {
        // Llenar HTML con datos
        document.getElementById('bread-nombre').textContent = producto.nombre;
        document.getElementById('detalle-nombre').textContent = producto.nombre;
        document.getElementById('detalle-precio').textContent = `$${producto.precio.toLocaleString('es-CL')}`;
        document.getElementById('detalle-desc').textContent = producto.descripcion;
        document.getElementById('detalle-codigo').textContent = producto.codigo;
        document.getElementById('detalle-categoria').textContent = producto.categoria;
        document.getElementById('detalle-stock').textContent = producto.stock;
        
        const imgMain = document.getElementById('detalle-img');
        imgMain.src = producto.imagen;
        imgMain.alt = producto.nombre;

        // Limitar la cantidad máxima de compra al stock disponible
        const inputCantidad = document.getElementById('cantidad');
        inputCantidad.max = producto.stock;

        // Botón principal de añadir en la vista detalle
        document.getElementById('btn-add-detalle').onclick = () => {
            const cantidad = parseInt(inputCantidad.value);
            if (cantidad > producto.stock) {
                alert(`Lo sentimos, solo nos quedan ${producto.stock} unidades en stock.`);
                return;
            }
            agregarAlCarrito(producto.id, cantidad);
        };

        // Renderizar productos relacionados (misma categoría o aleatorios)
        const relacionados = productosOriginales.filter(p => p.categoria === producto.categoria && p.id !== producto.id);
        const listaRelacionados = relacionados.length > 0 ? relacionados : productosOriginales.filter(p => p.id !== producto.id);
        renderizarProductos(listaRelacionados, 'contenedor-relacionados', 4);
    } else {
        document.querySelector('.detalle-producto').innerHTML = "<h2>Producto no encontrado</h2><a href='productos.html'>Volver a la tienda</a>";
    }
}

// 5. Gestión del Carrito (Soporta múltiples cantidades)
function agregarAlCarrito(id, cantidad = 1) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = productosOriginales.find(p => p.id === id);

    if (producto) {
        // Limpiar ruta para evitar problemas si se abre desde otra carpeta
        const imagenLimpia = producto.imagen.replace('../Home/img/', '').replace('img/', '');
        const indiceExistente = carrito.findIndex(item => item.id === id);

        if (indiceExistente !== -1) {
            // Verificar si al sumar excede el stock global
            if (carrito[indiceExistente].cantidad + cantidad > producto.stock) {
                alert(`No puedes añadir más. El stock máximo es de ${producto.stock} unidades.`);
                return;
            }
            carrito[indiceExistente].cantidad += cantidad;
        } else {
            const productoAGuardar = {
                ...producto,
                imagen: imagenLimpia,
                cantidad: cantidad
            };
            carrito.push(productoAGuardar);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContador();
        alert(`¡Añadiste ${cantidad} unidad(es) de ${producto.nombre} al carrito!`);
    }
}

function actualizarContador() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('cart-count');
    if (contador) {
        // Cuenta la cantidad real de items, no solo las filas del carrito
        const totalItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
        contador.textContent = totalItems;
    }
}

// 6. Inicialización de Listeners y carga de página
document.addEventListener('DOMContentLoaded', () => {
    // Cargar vistas base
    renderizarProductos(productosOriginales, 'contenedor-productos');
    cargarDetalleProducto();
    actualizarContador();

    // Listeners para los filtros si están en la pantalla
    const buscador = document.getElementById('buscador');
    const filtroCat = document.getElementById('filtro-categoria');

    if (buscador && filtroCat) {
        buscador.addEventListener('input', aplicarFiltros);
        filtroCat.addEventListener('change', aplicarFiltros);
    }
});