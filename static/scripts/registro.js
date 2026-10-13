// ==========================================
// 1. FUNCIONES AUXILIARES DE VALIDACIÓN
// ==========================================
function estaVacio(valor) {
    return !valor || valor.trim() === "";
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

function mostrarError(inputElemento, spanError, mensaje) {
    if (inputElemento) inputElemento.classList.add("input-error");
    if (spanError) spanError.textContent = `⚠️ ${mensaje}`;
}

function limpiarError(inputElemento, spanError) {
    if (inputElemento) inputElemento.classList.remove("input-error");
    if (spanError) spanError.textContent = "";
}

// ==========================================
// 2. INICIALIZACIÓN Y VALIDACIONES DEL REGISTRO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const formularioRegistro = document.getElementById("formRegistro");
    if (!formularioRegistro) return; // Si la página actual no tiene el formulario, no ejecuta nada

    // Elementos de entrada
    const runRegistro = document.getElementById("runRegistro");
    const nombreRegistro = document.getElementById("nombreRegistro");
    const apellidosRegistro = document.getElementById("apellidosRegistro");
    const correoRegistro = document.getElementById("correoRegistro");
    const fechaRegistro = document.getElementById("fechaRegistro");
    const telefonoRegistro = document.getElementById("telefonoRegistro");
    const passwordRegistro = document.getElementById("passwordRegistro");
    const confirmarRegistro = document.getElementById("confirmarRegistro");
    const regionRegistro = document.getElementById("regionRegistro");
    const comunaRegistro = document.getElementById("comunaRegistro");

    // Mensajes de error
    const errorRunRegistro = document.getElementById("errorRunRegistro");
    const errorNombreRegistro = document.getElementById("errorNombreRegistro");
    const errorApellidosRegistro = document.getElementById("errorApellidosRegistro");
    const errorCorreoRegistro = document.getElementById("errorCorreoRegistro");
    const errorFechaRegistro = document.getElementById("errorFechaRegistro");
    const errorTelefonoRegistro = document.getElementById("errorTelefonoRegistro");
    const errorPasswordRegistro = document.getElementById("errorPasswordRegistro");
    const errorConfirmarRegistro = document.getElementById("errorConfirmarRegistro");
    const errorRegionRegistro = document.getElementById("errorRegionRegistro");
    const errorComunaRegistro = document.getElementById("errorComunaRegistro");

    // Validar RUN
    function validarRunRegistro() {
        if (!runRegistro) return true;
        const run = runRegistro.value.trim();
        if (estaVacio(run)) {
            mostrarError(runRegistro, errorRunRegistro, "El RUN es obligatorio.");
            return false;
        }
        if (run.length < 7 || run.length > 9) {
            mostrarError(runRegistro, errorRunRegistro, "El RUN debe tener entre 7 y 9 caracteres.");
            return false;
        }
        const patronRun = /^[0-9]{6,8}[0-9Kk]$/;
        if (!patronRun.test(run)) {
            mostrarError(runRegistro, errorRunRegistro, "Ingrese el RUN sin puntos ni guión. Ej: 12345678K");
            return false;
        }
        limpiarError(runRegistro, errorRunRegistro);
        return true;
    }

    // Validar Nombre
    function validarNombreRegistro() {
        if (!nombreRegistro) return true;
        const nombre = nombreRegistro.value.trim();
        if (estaVacio(nombre)) {
            mostrarError(nombreRegistro, errorNombreRegistro, "El nombre es obligatorio.");
            return false;
        }
        if (superaMaximo(nombre, 50)) {
            mostrarError(nombreRegistro, errorNombreRegistro, "El nombre no puede superar los 50 caracteres.");
            return false;
        }
        limpiarError(nombreRegistro, errorNombreRegistro);
        return true;
    }

    // Validar Apellidos
    function validarApellidosRegistro() {
        if (!apellidosRegistro) return true;
        const apellidos = apellidosRegistro.value.trim();
        if (estaVacio(apellidos)) {
            mostrarError(apellidosRegistro, errorApellidosRegistro, "Los apellidos son obligatorios.");
            return false;
        }
        if (superaMaximo(apellidos, 100)) {
            mostrarError(apellidosRegistro, errorApellidosRegistro, "Los apellidos no pueden superar los 100 caracteres.");
            return false;
        }
        limpiarError(apellidosRegistro, errorApellidosRegistro);
        return true;
    }

    // Validar Correo
    function validarCorreoRegistro() {
        if (!correoRegistro) return true;
        const correo = correoRegistro.value.trim();
        if (estaVacio(correo)) {
            mostrarError(correoRegistro, errorCorreoRegistro, "El correo es obligatorio.");
            return false;
        }
        if (superaMaximo(correo, 100)) {
            mostrarError(correoRegistro, errorCorreoRegistro, "El correo no puede superar los 100 caracteres.");
            return false;
        }
        if (!correoPermitido(correo)) {
            mostrarError(correoRegistro, errorCorreoRegistro, "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
            return false;
        }
        limpiarError(correoRegistro, errorCorreoRegistro);
        return true;
    }

    // Validar Fecha
    function validarFechaRegistro() {
        if (fechaRegistro) limpiarError(fechaRegistro, errorFechaRegistro);
        return true;
    }

    // Validar Teléfono
    function validarTelefonoRegistro() {
        if (!telefonoRegistro) return true;
        const telefono = telefonoRegistro.value.trim();
        if (telefono === "") {
            limpiarError(telefonoRegistro, errorTelefonoRegistro);
            return true;
        }
        const patronTelefono = /^\+?[0-9\s]{8,15}$/;
        if (!patronTelefono.test(telefono)) {
            mostrarError(telefonoRegistro, errorTelefonoRegistro, "Ingrese un teléfono válido. Ej: +56 9 1234 5678.");
            return false;
        }
        limpiarError(telefonoRegistro, errorTelefonoRegistro);
        return true;
    }

    // Validar Contraseña
    function validarPasswordRegistro() {
        if (!passwordRegistro) return true;
        const password = passwordRegistro.value;
        if (estaVacio(password)) {
            mostrarError(passwordRegistro, errorPasswordRegistro, "La contraseña es obligatoria.");
            return false;
        }
        if (!longitudEntre(password, 4, 10)) {
            mostrarError(passwordRegistro, errorPasswordRegistro, "La contraseña debe tener entre 4 y 10 caracteres.");
            return false;
        }
        limpiarError(passwordRegistro, errorPasswordRegistro);
        return true;
    }

    // Confirmar Contraseña
    function validarConfirmarRegistro() {
        if (!confirmarRegistro || !passwordRegistro) return true;
        const password = passwordRegistro.value;
        const confirmar = confirmarRegistro.value;
        if (estaVacio(confirmar)) {
            mostrarError(confirmarRegistro, errorConfirmarRegistro, "Debe confirmar la contraseña.");
            return false;
        }
        if (password !== confirmar) {
            mostrarError(confirmarRegistro, errorConfirmarRegistro, "Las contraseñas no coinciden.");
            return false;
        }
        limpiarError(confirmarRegistro, errorConfirmarRegistro);
        return true;
    }

    // Validar Región
    function validarRegionRegistro() {
        if (!regionRegistro) return true;
        if (regionRegistro.value === "") {
            mostrarError(regionRegistro, errorRegionRegistro, "Debe seleccionar una región.");
            return false;
        }
        limpiarError(regionRegistro, errorRegionRegistro);
        return true;
    }

    // Validar Comuna
    function validarComunaRegistro() {
        if (!comunaRegistro) return true;
        if (comunaRegistro.value === "") {
            mostrarError(comunaRegistro, errorComunaRegistro, "Debe seleccionar una comuna.");
            return false;
        }
        limpiarError(comunaRegistro, errorComunaRegistro);
        return true;
    }

    // Asignar eventos en tiempo real
    if (runRegistro) runRegistro.addEventListener("input", validarRunRegistro);
    if (nombreRegistro) nombreRegistro.addEventListener("input", validarNombreRegistro);
    if (apellidosRegistro) apellidosRegistro.addEventListener("input", validarApellidosRegistro);
    if (correoRegistro) correoRegistro.addEventListener("input", validarCorreoRegistro);
    if (telefonoRegistro) telefonoRegistro.addEventListener("input", validarTelefonoRegistro);
    if (passwordRegistro) {
        passwordRegistro.addEventListener("input", () => {
            validarPasswordRegistro();
            if (confirmarRegistro && confirmarRegistro.value !== "") {
                validarConfirmarRegistro();
            }
        });
    }
    if (confirmarRegistro) confirmarRegistro.addEventListener("input", validarConfirmarRegistro);
    if (regionRegistro) regionRegistro.addEventListener("change", validarRegionRegistro);
    if (comunaRegistro) comunaRegistro.addEventListener("change", validarComunaRegistro);

    // Evento de envío del formulario
    formularioRegistro.addEventListener("submit", (event) => {
        event.preventDefault();

        const runValido = validarRunRegistro();
        const nombreValido = validarNombreRegistro();
        const apellidosValidos = validarApellidosRegistro();
        const correoValido = validarCorreoRegistro();
        const fechaValida = validarFechaRegistro();
        const telefonoValido = validarTelefonoRegistro();
        const passwordValido = validarPasswordRegistro();
        const confirmarValido = validarConfirmarRegistro();
        const regionValida = validarRegionRegistro();
        const comunaValida = validarComunaRegistro();

        if (
            runValido &&
            nombreValido &&
            apellidosValidos &&
            correoValido &&
            fechaValida &&
            telefonoValido &&
            passwordValido &&
            confirmarValido &&
            regionValida &&
            comunaValida
        ) {
            alert("¡Registro realizado correctamente!");
            formularioRegistro.reset();
        }
    });
});



