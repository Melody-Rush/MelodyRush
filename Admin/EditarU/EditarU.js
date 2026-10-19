const formulario = document.getElementById('formulario-usuarios');
const cajaMensajes = document.getElementById('caja-mensajes');
const regionRegistro = document.getElementById('regionRegistro');
const comunaRegistro = document.getElementById('comunaRegistro');
const direccionRegistro = document.getElementById('direccionRegistro');

//  OBTENER USUARIO QUE SE QUIERE EDITAR
// Este índice fue guardado desde ListarU.js
const indiceUsuarioEditar = localStorage.getItem('indiceUsuarioEditar');
// Obtenemos todos los usuarios guardados
let usuariosGuardados =JSON.parse(localStorage.getItem('misUsuarios')) || [];

// Obtenemos específicamente el usuario seleccionado
const usuarioEditar =
    usuariosGuardados[indiceUsuarioEditar];


// Si por algún motivo no existe el usuario,
// volvemos a la lista.
if (!usuarioEditar) {

    alert('No se encontró el usuario que desea editar.');

    window.location.href = '../ListarU/ListarU.html';
}


// =============================================================
//  REGIONES Y COMUNAS
// =============================================================

const regionesComunas = [

    {
        region: "Arica y Parinacota",
        comunas: [
            "Arica",
            "Camarones",
            "General Lagos",
            "Putre"
        ]
    },

    {
        region: "Tarapacá",
        comunas: [
            "Alto Hospicio",
            "Camiña",
            "Colchane",
            "Huara",
            "Iquique",
            "Pica",
            "Pozo Almonte"
        ]
    },

    {
        region: "Antofagasta",
        comunas: [
            "Antofagasta",
            "Calama",
            "Mejillones",
            "Ollagüe",
            "San Pedro de Atacama",
            "Sierra Gorda",
            "Tocopilla"
        ]
    },

    {
        region: "Atacama",
        comunas: [
            "Alto del Carmen",
            "Caldera",
            "Chañaral",
            "Copiapó",
            "Diego de Almagro",
            "Huasco",
            "Tierra Amarilla"
        ]
    },

    {
        region: "Coquimbo",
        comunas: [
            "Andacollo",
            "Combarbalá",
            "Coquimbo",
            "Illapel",
            "La Higuera",
            "La Serena",
            "Los Vilos",
            "Ovalle",
            "Río Hurtado",
            "Salamanca",
            "Vicuña"
        ]
    },

    {
        region: "Valparaíso",
        comunas: [
            "Algarrobo",
            "Cartagena",
            "Casablanca",
            "Concón",
            "El Quisco",
            "El Tabo",
            "La Ligua",
            "Olmué",
            "Papudo",
            "Quillota",
            "Quilpué",
            "Quintero",
            "San Antonio",
            "Valparaíso",
            "Villa Alemana",
            "Viña del Mar",
            "Zapallar"
        ]
    },

    {
        region: "Metropolitana de Santiago",
        comunas: [
            "Santiago",
            "Cerrillos",
            "Cerro Navia",
            "Conchalí",
            "El Bosque",
            "Estación Central",
            "Huechuraba",
            "Independencia",
            "La Cisterna",
            "La Florida",
            "La Granja",
            "La Pintana",
            "La Reina",
            "Las Condes",
            "Lo Barnechea",
            "Lo Espejo",
            "Lo Prado",
            "Macul",
            "Maipú",
            "Ñuñoa",
            "Pedro Aguirre Cerda",
            "Peñalolén",
            "Providencia",
            "Pudahuel",
            "Quilicura",
            "Quinta Normal",
            "Recoleta",
            "Renca",
            "San Joaquín",
            "San Miguel",
            "San Ramón",
            "Vitacura",
            "Puente Alto",
            "San Bernardo"
        ]
    },

    {
        region: "O'Higgins",
        comunas: [
            "Rancagua",
            "Machalí",
            "Graneros",
            "San Fernando",
            "Santa Cruz",
            "Pichilemu"
        ]
    },

    {
        region: "Maule",
        comunas: [
            "Talca",
            "Curicó",
            "Linares",
            "Cauquenes",
            "Constitución",
            "Parral",
            "San Javier"
        ]
    },

    {
        region: "Ñuble",
        comunas: [
            "Chillán",
            "Chillán Viejo",
            "Bulnes",
            "San Carlos",
            "Yungay"
        ]
    },

    {
        region: "Biobío",
        comunas: [
            "Concepción",
            "Talcahuano",
            "Chiguayante",
            "Coronel",
            "Lota",
            "San Pedro de la Paz",
            "Los Ángeles"
        ]
    },

    {
        region: "La Araucanía",
        comunas: [
            "Temuco",
            "Padre Las Casas",
            "Villarrica",
            "Pucón",
            "Angol",
            "Victoria"
        ]
    },

    {
        region: "Los Ríos",
        comunas: [
            "Valdivia",
            "Corral",
            "Lanco",
            "Los Lagos",
            "Paillaco",
            "Panguipulli"
        ]
    },

    {
        region: "Los Lagos",
        comunas: [
            "Puerto Montt",
            "Puerto Varas",
            "Osorno",
            "Castro",
            "Ancud",
            "Frutillar"
        ]
    },

    {
        region: "Aysén",
        comunas: [
            "Coyhaique",
            "Aysén",
            "Cochrane",
            "Chile Chico"
        ]
    },

    {
        region: "Magallanes y de la Antártica Chilena",
        comunas: [
            "Punta Arenas",
            "Natales",
            "Porvenir",
            "Cabo de Hornos"
        ]
    }

];


// =============================================================
//  CARGAR REGIONES
// =============================================================

function cargarRegiones() {

    regionesComunas.forEach(function(item) {

        const opcion =
            document.createElement('option');

        opcion.value = item.region;
        opcion.textContent = item.region;

        regionRegistro.appendChild(opcion);

    });

}


// =============================================================
//  CARGAR COMUNAS DE UNA REGIÓN
// =============================================================

function cargarComunas(regionSeleccionada) {

    // Primero limpiamos el select
    comunaRegistro.innerHTML =
        '<option value="">-- Seleccione la comuna --</option>';


    // Buscamos los datos de la región
    const datosRegion =
        regionesComunas.find(function(item) {

            return item.region === regionSeleccionada;

        });


    // Si encontramos la región, cargamos sus comunas
    if (datosRegion) {

        datosRegion.comunas.forEach(function(comuna) {

            const opcion =
                document.createElement('option');

            opcion.value = comuna;
            opcion.textContent = comuna;

            comunaRegistro.appendChild(opcion);

        });

        comunaRegistro.disabled = false;

    }
    else {

        comunaRegistro.disabled = true;

    }

}


// =============================================================
//  CARGAR DATOS DEL USUARIO EN EL FORMULARIO
// =============================================================

// Primero cargamos las regiones
cargarRegiones();


// Rellenamos los campos con los datos guardados
document.getElementById('runRegistro').value =
    usuarioEditar.run || '';

document.getElementById('nombreRegistro').value =
    usuarioEditar.nombre || '';

document.getElementById('apellidosRegistro').value =
    usuarioEditar.apellidos || '';

document.getElementById('correoRegistro').value =
    usuarioEditar.correo || '';

document.getElementById('fechaRegistro').value =
    usuarioEditar.fechaNacimiento || '';

document.getElementById('telefonoRegistro').value =
    usuarioEditar.telefono || '';

document.getElementById('passwordRegistro').value =
    usuarioEditar.password || '';

document.getElementById('confirmarRegistro').value =
    usuarioEditar.password || '';

document.getElementById('direccionRegistro').value =
    usuarioEditar.direccion || '';


// Seleccionamos la región guardada
regionRegistro.value =
    usuarioEditar.region || '';


// Cargamos las comunas correspondientes a esa región
if (usuarioEditar.region) {

    cargarComunas(usuarioEditar.region);

    // Seleccionamos la comuna guardada
    comunaRegistro.value =
        usuarioEditar.comuna || '';

}


// =============================================================
//  CAMBIAR COMUNAS CUANDO CAMBIA LA REGIÓN
// =============================================================

regionRegistro.addEventListener('change', function() {

    const regionSeleccionada =
        this.value;


    if (regionSeleccionada === '') {

        comunaRegistro.disabled = true;

        comunaRegistro.innerHTML =
            '<option value="">-- Seleccione primero una región --</option>';

        return;

    }


    cargarComunas(regionSeleccionada);

});


// =============================================================
//  VALIDACIONES EN TIEMPO REAL
// =============================================================


// RUN
document.getElementById('runRegistro').addEventListener('input', function() {

    const valor = this.value.trim();
    const error =
        document.getElementById('errorRunRegistro');


    if (valor.length === 0) {

        error.textContent = '';

    }
    else if (valor.length !== 9) {

        error.textContent =
            'El RUN debe tener 9 caracteres.';

    }
    else if (valor.includes('.') || valor.includes('-')) {

        error.textContent =
            'Ingrese el RUN sin puntos ni guion.';

    }
    else {

        error.textContent = '';

    }

});


// NOMBRE
document.getElementById('nombreRegistro').addEventListener('input', function() {

    const valor = this.value.trim();
    const error =
        document.getElementById('errorNombreRegistro');


    if (valor.length > 50) {

        error.textContent =
            'El nombre no puede superar los 50 caracteres.';

    }
    else {

        error.textContent = '';

    }

});


// APELLIDOS
document.getElementById('apellidosRegistro').addEventListener('input', function() {

    const valor = this.value.trim();
    const error =
        document.getElementById('errorApellidosRegistro');


    if (valor.length > 100) {

        error.textContent =
            'Los apellidos no pueden superar los 100 caracteres.';

    }
    else {

        error.textContent = '';

    }

});


// CORREO
document.getElementById('correoRegistro').addEventListener('input', function() {

    const correo = this.value.trim();

    const error =
        document.getElementById('errorCorreoRegistro');

    const correoPermitido =
        /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;


    if (correo === '') {

        error.textContent = '';

    }
    else if (correo.length > 100) {

        error.textContent =
            'El correo no puede superar los 100 caracteres.';

    }
    else if (!correoPermitido.test(correo)) {

        error.textContent =
            'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';

    }
    else {

        error.textContent = '';

    }

});


// CONTRASEÑA
document.getElementById('passwordRegistro').addEventListener('input', function() {

    const password = this.value;

    const error =
        document.getElementById('errorPasswordRegistro');


    if (password === '') {

        error.textContent = '';

    }
    else if (password.length < 4 || password.length > 10) {

        error.textContent =
            'La contraseña debe tener entre 4 y 10 caracteres.';

    }
    else {

        error.textContent = '';

    }

});


// CONFIRMAR CONTRASEÑA
document.getElementById('confirmarRegistro').addEventListener('input', function() {

    const password =
        document.getElementById('passwordRegistro').value;

    const confirmar =
        this.value;

    const error =
        document.getElementById('errorConfirmarRegistro');


    if (confirmar === '') {

        error.textContent = '';

    }
    else if (password !== confirmar) {

        error.textContent =
            'Las contraseñas no coinciden.';

    }
    else {

        error.textContent = '';

    }

});


// DIRECCIÓN
direccionRegistro.addEventListener('input', function() {

    const direccion =
        this.value.trim();

    const error =
        document.getElementById('errorDireccionRegistro');


    if (direccion === '') {

        error.textContent = '';

    }
    else if (direccion.length > 300) {

        error.textContent =
            'La dirección no puede superar los 300 caracteres.';

    }
    else {

        error.textContent = '';

    }

});


// =============================================================
//  GUARDAR CAMBIOS
// =============================================================

formulario.addEventListener('submit', function(evento) {

    evento.preventDefault();


    // Limpiamos mensajes anteriores
    document.querySelectorAll('.mserror').forEach(function(elemento) {

        elemento.textContent = '';

    });


    if (cajaMensajes) {

        cajaMensajes.style.display = 'none';

    }


    // =========================================================
    // OBTENER VALORES
    // =========================================================

    const run =
        document.getElementById('runRegistro').value.trim();

    const nombre =
        document.getElementById('nombreRegistro').value.trim();

    const apellidos =
        document.getElementById('apellidosRegistro').value.trim();

    const correo =
        document.getElementById('correoRegistro').value.trim();

    const fecha =
        document.getElementById('fechaRegistro').value;

    const telefono =
        document.getElementById('telefonoRegistro').value.trim();

    const password =
        document.getElementById('passwordRegistro').value;

    const confirmar =
        document.getElementById('confirmarRegistro').value;

    const region =
        document.getElementById('regionRegistro').value;

    const comuna =
        document.getElementById('comunaRegistro').value;

    const direccion =
        document.getElementById('direccionRegistro').value.trim();


    let hayErrores = false;


    // Función para mostrar errores
    function mostrarError(id, mensaje) {

        document.getElementById(id).textContent =
            mensaje;

        hayErrores = true;

    }


    // =========================================================
    // VALIDAR RUN
    // =========================================================

    if (run === '') {

        mostrarError(
            'errorRunRegistro',
            'El RUN es obligatorio.'
        );

    }
    else if (run.length !== 9) {

        mostrarError(
            'errorRunRegistro',
            'El RUN debe tener 9 caracteres.'
        );

    }
    else if (run.includes('.') || run.includes('-')) {

        mostrarError(
            'errorRunRegistro',
            'Ingrese el RUN sin puntos ni guion.'
        );

    }


    // =========================================================
    // VALIDAR NOMBRE
    // =========================================================

    if (nombre === '') {

        mostrarError(
            'errorNombreRegistro',
            'El nombre es obligatorio.'
        );

    }
    else if (nombre.length > 50) {

        mostrarError(
            'errorNombreRegistro',
            'El nombre no puede superar los 50 caracteres.'
        );

    }


    // =========================================================
    // VALIDAR APELLIDOS
    // =========================================================

    if (apellidos === '') {

        mostrarError(
            'errorApellidosRegistro',
            'Los apellidos son obligatorios.'
        );

    }
    else if (apellidos.length > 100) {

        mostrarError(
            'errorApellidosRegistro',
            'Los apellidos no pueden superar los 100 caracteres.'
        );

    }


    // =========================================================
    // VALIDAR CORREO
    // =========================================================

    const correoPermitido =
        /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;


    if (correo === '') {

        mostrarError(
            'errorCorreoRegistro',
            'El correo es obligatorio.'
        );

    }
    else if (correo.length > 100) {

        mostrarError(
            'errorCorreoRegistro',
            'El correo no puede superar los 100 caracteres.'
        );

    }
    else if (!correoPermitido.test(correo)) {

        mostrarError(
            'errorCorreoRegistro',
            'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.'
        );

    }


    // La fecha de nacimiento es opcional.


    // =========================================================
    // VALIDAR CONTRASEÑA
    // =========================================================

    if (password === '') {

        mostrarError(
            'errorPasswordRegistro',
            'La contraseña es obligatoria.'
        );

    }
    else if (password.length < 4 || password.length > 10) {

        mostrarError(
            'errorPasswordRegistro',
            'La contraseña debe tener entre 4 y 10 caracteres.'
        );

    }


    // =========================================================
    // VALIDAR CONFIRMACIÓN
    // =========================================================

    if (confirmar === '') {

        mostrarError(
            'errorConfirmarRegistro',
            'Debe confirmar la contraseña.'
        );

    }
    else if (password !== confirmar) {

        mostrarError(
            'errorConfirmarRegistro',
            'Las contraseñas no coinciden.'
        );

    }


    // =========================================================
    // VALIDAR REGIÓN
    // =========================================================

    if (region === '') {

        mostrarError(
            'errorRegionRegistro',
            'Seleccione una región.'
        );

    }


    // =========================================================
    // VALIDAR COMUNA
    // =========================================================

    if (comuna === '') {

        mostrarError(
            'errorComunaRegistro',
            'Seleccione una comuna.'
        );

    }


    // =========================================================
    // VALIDAR DIRECCIÓN
    // =========================================================

    if (direccion === '') {

        mostrarError(
            'errorDireccionRegistro',
            'La dirección es obligatoria.'
        );

    }
    else if (direccion.length > 300) {

        mostrarError(
            'errorDireccionRegistro',
            'La dirección no puede superar los 300 caracteres.'
        );

    }


    // Si existe algún error no guardamos
    if (hayErrores) {

        return;

    }


    // =========================================================
    // CREAR USUARIO ACTUALIZADO
    // =========================================================

    const usuarioActualizado = {

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
    // REEMPLAZAR USUARIO
    // =========================================================

    usuariosGuardados[indiceUsuarioEditar] =
        usuarioActualizado;


    // Guardamos nuevamente todo el arreglo
    localStorage.setItem(
        'misUsuarios',
        JSON.stringify(usuariosGuardados)
    );


    // Ya no necesitamos recordar el índice
    localStorage.removeItem(
        'indiceUsuarioEditar'
    );


    // =========================================================
    // MENSAJE DE ÉXITO
    // =========================================================

    if (cajaMensajes) {

        cajaMensajes.textContent =
            '¡Usuario actualizado correctamente!';

        cajaMensajes.style.textAlign =
            'center';

        cajaMensajes.style.color =
            'green';

        cajaMensajes.style.backgroundColor =
            '#ccffcc';

        cajaMensajes.style.display =
            'block';

    }


    // Después de un pequeño momento volvemos a Listar Usuarios
    setTimeout(function() {

        window.location.href =
            '../ListarU/ListarU.html';

    }, 800);

});