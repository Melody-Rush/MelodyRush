const formulario = document.getElementById('formulario-usuarios');
const cajaMensajes = document.getElementById('caja-mensajes');

// ==============================================================
// 1. VALIDACIONES EN TIEMPO REAL (Mientras el usuario escribe)
// ==============================================================

// Validar RUN
document.getElementById('runRegistro').addEventListener('input', function() {
    const valor = this.value.trim();
    // Si hay algo escrito y no son exactamente 9 caracteres
    if (valor.length > 0 && valor.length !== 9) {
        document.getElementById('errorRunRegistro').textContent = 'El RUN debe tener 9 caracteres.';
    } else {
        document.getElementById('errorRunRegistro').textContent = ''; // Borra el error si está correcto
    }
});

// Validar Correo
document.getElementById('correoRegistro').addEventListener('input', function() {
    const valor = this.value.trim();
    if (valor.length > 0 && (!valor.includes("@") || !valor.includes("."))) {
        document.getElementById('errorCorreoRegistro').textContent = 'Se aceptan correos @gmail.com y similares.';
    } else {
        document.getElementById('errorCorreoRegistro').textContent = '';
    }
});

// Validar Contraseña
document.getElementById('passwordRegistro').addEventListener('input', function() {
    const valor = this.value;
    if (valor.length > 0 && valor.length < 8) {
        document.getElementById('errorPasswordRegistro').textContent = 'Necesita 8 caracteres mínimo.';
    } else {
        document.getElementById('errorPasswordRegistro').textContent = '';
    }
    
    // Si el usuario ya había escrito algo en "Confirmar", revisamos si coinciden
    const confirmar = document.getElementById('confirmarRegistro').value;
    if (confirmar.length > 0 && valor !== confirmar) {
        document.getElementById('errorConfirmarRegistro').textContent = 'Las contraseñas no coinciden.';
    } else if (confirmar.length > 0 && valor === confirmar) {
        document.getElementById('errorConfirmarRegistro').textContent = '';
    }
});

// Validar Confirmación de Contraseña
document.getElementById('confirmarRegistro').addEventListener('input', function() {
    const passOriginal = document.getElementById('passwordRegistro').value;
    if (this.value.length > 0 && this.value !== passOriginal) {
        document.getElementById('errorConfirmarRegistro').textContent = 'Las contraseñas no coinciden.';
    } else {
        document.getElementById('errorConfirmarRegistro').textContent = '';
    }
});


// ==============================================================
// 2. VALIDACIÓN FINAL (Al presionar el botón REGISTRAR)
// ==============================================================

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita que recargue la página

    // Limpiar todos los mensajes de error previos
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

    let hayErrores = false;

    function mostrarError(id, mensaje) {
        document.getElementById(id).textContent = mensaje;
        hayErrores = true; 
    }

    // Validaciones finales (se ejecutan si el usuario presionó enviar dejando campos vacíos o con errores)
    if (run === "") mostrarError('errorRunRegistro', 'El RUN es obligatorio.');
    else if (run.length !== 9) mostrarError('errorRunRegistro', 'El RUN debe tener 9 caracteres.');

    if (nombre === "") mostrarError('errorNombreRegistro', 'El nombre es obligatorio.');
    if (apellidos === "") mostrarError('errorApellidosRegistro', 'Los apellidos son obligatorios.');

    if (correo === "") mostrarError('errorCorreoRegistro', 'El correo es obligatorio.');
    else if (!correo.includes("@") || !correo.includes(".")) mostrarError('errorCorreoRegistro', 'Se aceptan correos @gmail.com y similares.');

    if (fecha === "") mostrarError('errorFechaRegistro', 'La fecha de nacimiento es obligatoria.');

    if (password === "") mostrarError('errorPasswordRegistro', 'La contraseña es obligatoria.');
    else if (password.length < 8) mostrarError('errorPasswordRegistro', 'Necesita 8 caracteres mínimo.');

    if (confirmar === "") mostrarError('errorConfirmarRegistro', 'Debe confirmar la contraseña.');
    else if (password !== confirmar) mostrarError('errorConfirmarRegistro', 'Las contraseñas no coinciden.');

    if (region === "") mostrarError('errorRegionRegistro', 'Seleccione una región.');
    if (comuna === "") mostrarError('errorComunaRegistro', 'Seleccione una comuna.');

    // Si hayErrores es true, detenemos el proceso
    if (hayErrores) {
        return; 
    }

    // 5. GUARDAR LA INFORMACIÓN EN UN OBJETO
    const nuevoUsuario = {
        run: run,
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        fechaNacimiento: fecha,
        telefono: telefono, 
        password: password,
        region: region,
        comuna: comuna
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
});