// ==========================================
// 1. FUNCIONES AUXILIARES DE VALIDACIÓN
// ==========================================
function estaVacio(valor) {
    return !valor || valor.trim() === "";
}

function mostrarError(inputElement, spanError, mensaje) {
    if (inputElement) inputElement.classList.add("input-error");
    if (spanError) spanError.textContent = `⚠️ ${mensaje}`;
}

function limpiarError(inputElement, spanError) {
    if (inputElement) inputElement.classList.remove("input-error");
    if (spanError) spanError.textContent = "";
}

function correoPermitido(correo) {
    const patronCorreo = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return patronCorreo.test(correo);
}

function validarCorreoLogin() {
    const inputCorreo = document.getElementById("correoLogin");
    const spanError = document.getElementById("errorCorreoLogin");
    if (!inputCorreo || !spanError) return false;

    const valor = inputCorreo.value;
    limpiarError(inputCorreo, spanError);

    if (estaVacio(valor)) {
        mostrarError(inputCorreo, spanError, "El correo electrónico es obligatorio.");
        return false;
    }

    if (!correoPermitido(valor)) {
        mostrarError(inputCorreo, spanError, "Ingresa un correo válido (duoc.cl, profesor.duoc.cl o gmail.com).");
        return false;
    }

    return true;
}

function validarContrasenaLogin() {
    const inputPass = document.getElementById("contrasenaLogin");
    const spanError = document.getElementById("errorContrasenaLogin");
    if (!inputPass || !spanError) return false;

    const valor = inputPass.value;
    limpiarError(inputPass, spanError);

    if (estaVacio(valor)) {
        mostrarError(inputPass, spanError, "La contraseña es obligatoria.");
        return false;
    }

    return true;
}

// ==========================================
// 2. INICIALIZACIÓN
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("formLogin");

    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();

            const correoValido = validarCorreoLogin();
            const passValida = validarContrasenaLogin();

            if (correoValido && passValida) {
                alert("¡Inicio de sesión exitoso!");
            }
        });
    }
});