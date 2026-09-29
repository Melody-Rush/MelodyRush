// Funciones de ayuda visual
function mostrarError(inputElemento, spanError, mensaje) {
    inputElemento.classList.add('input-error'); // Pinta el cuadradito de rojo
    spanError.textContent = `⚠️ ${mensaje}`;    // Pone el mensaje rojo con icono abajo
}

function limpiarError(inputElemento, spanError) {
    inputElemento.classList.remove('input-error');
    spanError.textContent = '';
}

// Ejemplo de validación para el Login
const formLogin = document.getElementById('form-login');

if (formLogin) {
    formLogin.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita que se recargue la página o salgan carteles nativos

        const correoInput = document.getElementById('correo');
        const errCorreo = document.getElementById('err-correo');
        const valorCorreo = correoInput.value.trim();

        // 1. Validar que no esté vacío
        if (estaVacio(valorCorreo)) {
            mostrarError(correoInput, errCorreo, "El correo no puede estar vacío.");
            return;
        }

        // 2. Validar que tenga '@' y un dominio válido
        if (!valorCorreo.includes('@')) {
            mostrarError(correoInput, errCorreo, "Debe incluir un '@' en la dirección de correo.");
            return;
        }

        if (!correoPermitido(valorCorreo)) {
            mostrarError(correoInput, errCorreo, "Dominio no permitido (ej: @duoc.cl, @gmail.com).");
            return;
        }

        // Si todo está bien:
        limpiarError(correoInput, errCorreo);
        alert("¡Inicio de sesión exitoso!");
    });

    // Limpia el error rojo automáticamente cuando el usuario empieza a escribir de nuevo
    document.getElementById('correo')?.addEventListener('input', function() {
        limpiarError(this, document.getElementById('err-correo'));
    });
}