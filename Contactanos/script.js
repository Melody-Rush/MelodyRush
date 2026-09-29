document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-contacto');
    const inputNombre = document.getElementById('nombre');
    const inputCorreo = document.getElementById('correo');
    const inputTelefono = document.getElementById('telefono');
    const inputComentario = document.getElementById('comentario');
    const charCount = document.getElementById('char-count');
    const mensajeExito = document.getElementById('mensaje-exito');

    const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];

    // Contador dinámico de caracteres
    inputComentario.addEventListener('input', () => {
        charCount.textContent = inputComentario.value.length;
    });

    // Validaciones en tiempo real al escribir
    inputNombre.addEventListener('input', () => validarNombre());
    inputCorreo.addEventListener('input', () => validarCorreo());
    inputTelefono.addEventListener('input', () => validarTelefono());
    inputComentario.addEventListener('input', () => validarComentario());

    // Evento de envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const v1 = validarNombre();
        const v2 = validarCorreo();
        const v3 = validarTelefono();
        const v4 = validarComentario();

        if (v1 && v2 && v3 && v4) {
            mensajeExito.classList.remove('hidden');
            form.reset();
            charCount.textContent = '0';

            // Ocultar notificación de éxito tras 5 segundos
            setTimeout(() => {
                mensajeExito.classList.add('hidden');
            }, 5000);
        }
    });

    // Validar Nombre
    function validarNombre() {
        const val = inputNombre.value.trim();
        const err = document.getElementById('error-nombre');

        if (val === '') {
            return setError(inputNombre, err, 'El nombre completo es obligatorio.');
        }
        if (val.length > 100) {
            return setError(inputNombre, err, 'El nombre no debe exceder 100 caracteres.');
        }
        return clearError(inputNombre, err);
    }

    // Validar Correo (según rúbrica)
    function validarCorreo() {
        const val = inputCorreo.value.trim().toLowerCase();
        const err = document.getElementById('error-correo');

        if (val === '') {
            return setError(inputCorreo, err, 'El correo es obligatorio.');
        }
        if (val.length > 100) {
            return setError(inputCorreo, err, 'El correo no debe exceder 100 caracteres.');
        }

        const esValido = dominiosPermitidos.some(domain => val.endsWith(domain));
        if (!esValido) {
            return setError(inputCorreo, err, 'Permitido solo @duoc.cl, @profesor.duoc.cl o @gmail.com');
        }
        return clearError(inputCorreo, err);
    }

    // Validar Teléfono / Número de contacto
    function validarTelefono() {
        const val = inputTelefono.value.trim();
        const err = document.getElementById('error-telefono');
        const phoneRegex = /^(\+?56)?9\d{8}$|^[0-9]{8,12}$/;

        if (val === '') {
            return setError(inputTelefono, err, 'El número de contacto es obligatorio.');
        }
        if (!phoneRegex.test(val)) {
            return setError(inputTelefono, err, 'Ingresa un número válido (ej: +56912345678 o 912345678).');
        }
        return clearError(inputTelefono, err);
    }

    // Validar Comentario
    function validarComentario() {
        const val = inputComentario.value.trim();
        const err = document.getElementById('error-comentario');

        if (val === '') {
            return setError(inputComentario, err, 'El comentario es obligatorio.');
        }
        if (val.length > 500) {
            return setError(inputComentario, err, 'El comentario no debe exceder 500 caracteres.');
        }
        return clearError(inputComentario, err);
    }

    // Helpers UI
    function setError(input, errEl, msg) {
        input.classList.add('input-error');
        errEl.textContent = msg;
        return false;
    }

    function clearError(input, errEl) {
        input.classList.remove('input-error');
        errEl.textContent = '';
        return true;
    }
});