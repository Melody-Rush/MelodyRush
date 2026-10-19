const formulario = document.getElementById('formulario-usuarios');
const cajaMensajes = document.getElementById('caja-mensajes');
const regionRegistro = document.getElementById('regionRegistro');
const comunaRegistro = document.getElementById('comunaRegistro');
const direccionRegistro = document.getElementById('direccionRegistro');

//ARREGLO DE REGIONES Y COMUNAS
// Este arreglo contiene las regiones de Chile. Cada región tiene asociadas sus respectivas comunas.
const regionesComunas = [
    {
        region: "Arica y Parinacota",
        comunas: ["Arica", "Camarones", "General Lagos", "Putre"]
    },
    {
        region: "Tarapacá",
        comunas: ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"]
    },
    {
        region: "Antofagasta",
        comunas: ["Antofagasta", "Calama", "Mejillones", "Ollagüe", "San Pedro de Atacama", "Sierra Gorda", "Tocopilla"]
    },
    {
        region: "Atacama",
        comunas: ["Alto del Carmen", "Caldera", "Chañaral", "Copiapó", "Diego de Almagro", "Huasco", "Tierra Amarilla",]
    },
    {
        region: "Coquimbo",
        comunas: ["Andacollo", "Combarbalá", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", "Ovalle", "Río Hurtado", "Salamanca", "Vicuña"]
    },
    {
        region: "Valparaíso",
        comunas: ["Algarrobo", "Cartagena", "Casablanca", "Concón", "El Quisco", "El Tabo", "La Ligua", "Olmué", "Papudo", "Quillota", "Quilpué", "Quintero", "San Antonio", "Valparaíso",
            "Villa Alemana", "Viña del Mar", "Zapallar"]
    },
    {
        region: "Metropolitana de Santiago",
        comunas: ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina",
            "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta",
            "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "San Bernardo"]
    },
    {
        region: "O'Higgins",
        comunas: ["Rancagua", "Machalí", "Graneros", "San Fernando", "Santa Cruz", "Pichilemu"]
    },
    {
        region: "Maule",
        comunas: ["Talca", "Curicó", "Linares", "Cauquenes", "Constitución", "Parral", "San Javier"]
    },
    {
        region: "Ñuble",
        comunas: ["Chillán", "Chillán Viejo", "Bulnes", "San Carlos", "Yungay"]
    },
    {
        region: "Biobío",
        comunas: ["Concepción", "Talcahuano", "Chiguayante", "Coronel", "Lota", "San Pedro de la Paz", "Los Ángeles"]
    },
    {
        region: "La Araucanía",
        comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol", "Victoria"]
    },
    {
        region: "Los Ríos",
        comunas: ["Valdivia", "Corral", "Lanco", "Los Lagos", "Paillaco", "Panguipulli"]
    },
    {
        region: "Los Lagos",
        comunas: ["Puerto Montt", "Puerto Varas", "Osorno", "Castro", "Ancud", "Frutillar"]
    },
    {
        region: "Aysén",
        comunas: ["Coyhaique", "Aysén", "Cochrane", "Chile Chico"]
    },
    {
        region: "Magallanes y de la Antártica Chilena",
        comunas: ["Punta Arenas", "Natales", "Porvenir", "Cabo de Hornos"]
    }
];

//FUNCIÓN PARA CARGAR LAS REGIONES.
// Esta función recorre el arreglo regionesComunas y crea automáticamente una opción <option> por cada región dentro del select de región.
function cargarRegiones() {
    regionesComunas.forEach(function(item) {
        const opcion = document.createElement('option');  // Creamos una nueva opción
        opcion.value = item.region;  // El valor será el nombre de la región
        opcion.textContent = item.region;
        regionRegistro.appendChild(opcion); // Agregamos la opción al select
    });
}
cargarRegiones();

//CAMBIAR COMUNAS SEGÚN LA REGIÓN SELECCIONADA
// Este evento se ejecuta cada vez que el usuario cambia la región seleccionada.
regionRegistro.addEventListener('change', function () {
    const regionSeleccionada = this.value;  // Guardamos la región que eligió el usuario
    comunaRegistro.innerHTML =      // Primero limpiamos las comunas anteriores
        '<option value="">-- Seleccione la comuna --</option>'; 

    if (regionSeleccionada === '') {        // Si el usuario deja la región vacía, deshabilitamos nuevamente el select de comuna.
        comunaRegistro.disabled = true;
        comunaRegistro.innerHTML =
            '<option value="">-- Seleccione primero una región --</option>';   
        return;
    }

    const datosRegion = regionesComunas.find(function(item) { // Buscamos dentro del arreglo la región seleccionada
        return item.region === regionSeleccionada;
    });

    if (datosRegion) {
        datosRegion.comunas.forEach(function(comuna) {   // Si encontramos la región, recorremos todas sus comunas.
            const opcion = document.createElement('option');  // Creamos una opción para cada comuna
            opcion.value = comuna;
            opcion.textContent = comuna;
            comunaRegistro.appendChild(opcion);   // Agregamos la comuna al select
        });

        // Una vez cargadas las comunas, habilitamos el select.
        comunaRegistro.disabled = false;
    }
});


// ==============================================================
// VALIDACIONES EN TIEMPO REAL (Mientras el usuario escribe)
// ==============================================================

// Validar RUN
document.getElementById('runRegistro').addEventListener('input', function() {
    const valor = this.value.trim();
    const error = document.getElementById('errorRunRegistro');
    if (valor.length === 0) {
        error.textContent = '';
    }
    else if (valor.length !== 9) {
        error.textContent = 'El RUN debe tener 9 caracteres.';
    }
    else if (valor.includes('.') || valor.includes('-')) {
        error.textContent ='Ingrese el RUN sin puntos ni guion.';
    }
    else {
        error.textContent = '';
    }
});

// Validar NOMBRE
document.getElementById('nombreRegistro').addEventListener('input', function() {
    const valor = this.value.trim();
    const error = document.getElementById('errorNombreRegistro');
    if (valor.length > 50) {
        error.textContent = 'El nombre no puede superar los 50 caracteres.';
    }
    else {
        error.textContent = '';
    }
});

// Validar APELLIDOS
document.getElementById('apellidosRegistro').addEventListener('input', function() {
    const valor = this.value.trim();
    const error = document.getElementById('errorApellidosRegistro');
    if (valor.length > 100) {
        error.textContent = 'Los apellidos no pueden superar los 100 caracteres.';
    }
    else {
        error.textContent = '';
    }
});

// Validar Correo
document.getElementById('correoRegistro').addEventListener('input', function() {
    const correo = this.value.trim();
    const error =document.getElementById('errorCorreoRegistro');
    const correoPermitido =/^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

    if (correo === '') { // Mientras esté vacío no mostramos error.
        error.textContent = '';
    }
    else if (correo.length > 100) {
        error.textContent = 'El correo no puede superar los 100 caracteres.';
    }
    else if (!correoPermitido.test(correo)) {
        error.textContent = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    }
    else {
        error.textContent = '';
    }
});

// Validar Contraseña
document.getElementById('passwordRegistro').addEventListener('input', function() {
    const password = this.value;
    const error =document.getElementById('errorPasswordRegistro');

    if (password === '') {
        error.textContent = '';
    }
    else if (password.length < 4 || password.length > 10) {
        error.textContent = 'La contraseña debe tener entre 4 y 10 caracteres.';
    }
    else {
        error.textContent = '';
    }
});
    
    // Confirmar contraseña, revisamos si coinciden
 document.getElementById('confirmarRegistro').addEventListener('input', function() {
    const password =document.getElementById('passwordRegistro').value;
    const confirmar = this.value;
    const error =document.getElementById('errorConfirmarRegistro');

    if (confirmar === '') {
        error.textContent = '';
    }
    else if (password !== confirmar) {
        error.textContent = 'Las contraseñas no coinciden.';
    }
    else {
        error.textContent = '';
    }
});

//VALIDACIÓN DE DIRECCIÓN EN TIEMPO REAL
direccionRegistro.addEventListener('input', function () {
    const error =document.getElementById('errorDireccionRegistro');
    const direccion = this.value.trim();

    if (direccion === '') { // Si está vacío, mostramos error
        error.textContent = '';
    }
    else if (direccion.length > 300) { // Si supera 300 caracteres, mostramos error
        error.textContent = 'La dirección no puede superar los 300 caracteres.';
    }
    else {
        error.textContent = ''; // Si todo está correcto, limpiamos el mensaje
    }

});

// ==============================================================
//  VALIDACIÓN FINAL (Al presionar el botón REGISTRAR)
// ==============================================================

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita que recargue la página

    // Limpiar todos los mensajes de error anteriores
    document.querySelectorAll('.mserror').forEach(function(elemento) {
        elemento.textContent = '';
    });

    if (cajaMensajes) cajaMensajes.style.display = 'none';

    // Obtener los valores
    const run = document.getElementById('runRegistro').value.trim();
    const nombre = document.getElementById('nombreRegistro').value.trim();
    const apellidos = document.getElementById('apellidosRegistro').value.trim();
    const correo = document.getElementById('correoRegistro').value.trim();
    const fecha = document.getElementById('fechaRegistro').value;
    const telefono = document.getElementById('telefonoRegistro').value.trim();
    const password = document.getElementById('passwordRegistro').value;
    const confirmar = document.getElementById('confirmarRegistro').value;
    const region = document.getElementById('regionRegistro').value;
    const comuna = document.getElementById('comunaRegistro').value;
    const direccion =document.getElementById('direccionRegistro').value.trim();
    
    let hayErrores = false; // Variable que indica si encontramos algún error.

    // Función utilizada para mostrar los errores.
    function mostrarError(id, mensaje) {
        document.getElementById(id).textContent = mensaje;
        hayErrores = true; 
    }

    // Validaciones finales (se ejecutan si el usuario presionó enviar dejando campos vacíos o con errores)
    if (run === '') {
        mostrarError('errorRunRegistro', 'El RUN es obligatorio.');
    }
    else if (run.length !== 9) {
        mostrarError('errorRunRegistro', 'El RUN debe tener 9 caracteres.');
    }
    else if (run.includes('.') || run.includes('-')) {
        mostrarError('errorRunRegistro', 'Ingrese el RUN sin puntos ni guion.'
        );
    }

    if (nombre === '') {
        mostrarError('errorNombreRegistro', 'El nombre es obligatorio.');
    }
    else if (nombre.length > 50) {
        mostrarError('errorNombreRegistro', 'El nombre no puede superar los 50 caracteres.');
    }

     if (apellidos === '') {
        mostrarError('errorApellidosRegistro', 'Los apellidos son obligatorios.');
    }
    else if (apellidos.length > 100) {
        mostrarError('errorApellidosRegistro', 'Los apellidos no pueden superar los 100 caracteres.');
    }

    const correoPermitido =/^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (correo === '') {
        mostrarError('errorCorreoRegistro', 'El correo es obligatorio.');
    }
    else if (correo.length > 100) {
        mostrarError('errorCorreoRegistro', 'El correo no puede superar los 100 caracteres.');
    }
    else if (!correoPermitido.test(correo)) {
        mostrarError('errorCorreoRegistro', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.');
    }

    //la feha de nacimiento es opcional

    if (password === '') {
        mostrarError('errorPasswordRegistro', 'La contraseña es obligatoria.');
    }
    else if (password.length < 4 || password.length > 10) {
        mostrarError('errorPasswordRegistro', 'La contraseña debe tener entre 4 y 10 caracteres.');
    }

    if (confirmar === '') {
        mostrarError('errorConfirmarRegistro', 'Debe confirmar la contraseña.');
    }
    else if (password !== confirmar) {
        mostrarError('errorConfirmarRegistro', 'Las contraseñas no coinciden.');
    }

    if (region === "") {
        mostrarError('errorRegionRegistro', 'Seleccione una región.');
    }

    if (comuna === "") {
        mostrarError('errorComunaRegistro', 'Seleccione una comuna.');
    }

    if (direccion === "") {
        mostrarError('errorDireccionRegistro', 'La dirección es obligatoria.');
    }
    else if (direccion.length > 300) {
        mostrarError('errorDireccionRegistro', 'La dirección no puede superar los 300 caracteres.');
    }

    // Si hayErrores es true, detenemos el proceso
    if (hayErrores) {
        return; 
    }

    // GUARDAR LA INFORMACIÓN EN UN OBJETO
    const nuevoUsuario = {
        run: run,
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        fechaNacimiento: fecha,
        telefono: telefono, 
        password: password,
        region: region,
        comuna: comuna,
        direccion: direccion
    };

    // =========================================================
    // NUEVO: GUARDAR EN LOCALSTORAGE
    // =========================================================
    
    // A. Pedimos la lista actual de usuarios al navegador. 
    // Si no hay nada guardado, iniciamos una lista vacía [].
    let listaUsuarios = JSON.parse(localStorage.getItem('misUsuarios')) || [];

    // B. Metemos el nuevo usuario a esa lista
    listaUsuarios.push(nuevoUsuario);

    // C. Volvemos a guardar la lista actualizada en el navegador
    localStorage.setItem('misUsuarios', JSON.stringify(listaUsuarios));

    // =========================================================

    // Mensaje de éxito
    if (cajaMensajes) {
        cajaMensajes.textContent = "¡Usuario registrado y guardado correctamente!";
        cajaMensajes.style.textAlign = "center"; 
        cajaMensajes.style.color = "green";
        cajaMensajes.style.backgroundColor = "#ccffcc";
        cajaMensajes.style.display = "block";
    }

    formulario.reset();

     // Como el formulario volvió al inicio, deshabilitamos nuevamente el select de comuna.
    comunaRegistro.disabled = true;
    comunaRegistro.innerHTML ='<option value="">-- Seleccione primero una región --</option>';
});
