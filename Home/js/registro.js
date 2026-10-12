const formularioRegistro=document.getElementById("formRegistro");
const runRegistro=document.getElementById("runRegistro");
const nombreRegistro=document.getElementById("nombreRegistro");
const apellidosRegistro=document.getElementById("apellidosRegistro");
const correoRegistro=document.getElementById("correoRegistro");
const fechaRegistro=document.getElementById("fechaRegistro");
const telefonoRegistro=document.getElementById("telefonoRegistro");
const passwordRegistro=document.getElementById("passwordRegistro");
const confirmarRegistro=document.getElementById("confirmarRegistro");
const regionRegistro=document.getElementById("regionRegistro");
const comunaRegistro=document.getElementById("comunaRegistro");

//para mensajes de error
const errorRunRegistro=document.getElementById("errorRunRegistro");
const errorNombreRegistro=document.getElementById("errorNombreRegistro");
const errorApellidosRegistro=document.getElementById("errorApellidosRegistro");
const errorCorreoRegistro=document.getElementById("errorCorreoRegistro");

const errorFechaRegistro=document.getElementById("errorFechaRegistro");
const errorTelefonoRegistro=document.getElementById("errorTelefonoRegistro");
const errorPasswordRegistro=document.getElementById("errorPasswordRegistro");
const errorConfirmarRegistro=document.getElementById("errorConfirmarRegistro");
const errorRegionRegistro=document.getElementById("errorRegionRegistro");
const errorComunaRegistro=document.getElementById("errorComunaRegistro");

//para validar run
function validarRunRegistro(){
    const run=runRegistro.value.trim();
    if(estaVacio(run)) {
        mostrarError(
            runRegistro, errorRunRegistro, "El run es obligatorio"
        );
        return false;
    }
    if(run.length<7 || run.length>9) {
        mostrarError(
            runRegistro, errorRunRegistro, "El run debe tener 9 caracteres."
        );
        return false;
    }

    const patronRun= /^[0-9]{6,8}[0-9Kk]$/;
    if (!patronRun.test(run)) {
        mostrarError(
            runRegistro, errorRunRegistro, "Ingrese el RUN sin puntos ni guión. Ej: 12345678K"
        );
        return false;
    }
    limpiarError(
        runRegistro, errorRunRegistro
    );
    return true;
}
//validar home(pag inicial)
function validarNombreRegistro() {
    const nombre=nombreRegistro.value.trim();
    if (estaVacio(nombre)) {
        mostrarError(
            nombreRegistro, errorNombreRegistro, "El nombre es obligatorio."
        );
        return false;
    }
    if (superaMaximo(nombre, 50)) {
        mostrarError(nombreRegistro, errorNombreRegistro, "El nombre no puede superar los 50 caracteres."        
        );
        return false;
    }
    limpiarError(
        nombreRegistro, errorNombreRegistro
    );
    return true
}
//Validar apellido.
function validarApellidosRegistro() {

    const apellidos = apellidosRegistro.value.trim();
    if (estaVacio(apellidos)) {
        mostrarError(
            apellidosRegistro, errorApellidosRegistro, "Los apellidos son obligatorios."
        );
        return false;
    }
    if (superaMaximo(apellidos, 100)) {
        mostrarError(apellidosRegistro, errorApellidosRegistro, "Los apellidos no pueden superar los 100 caracteres."
        );
        return false;
    }
    limpiarError(
        apellidosRegistro, errorApellidosRegistro
    );
    return true;
}
//para valudar correo
function validarCorreoRegistro() {
    const correo = correoRegistro.value.trim();
    if (estaVacio(correo)) {
        mostrarError(
            correoRegistro, errorCorreoRegistro, "El correo es obligatorio."
        );
        return false;
    }
    if (superaMaximo(correo, 100)) {
        mostrarError(correoRegistro, errorCorreoRegistro, "El correo no puede superar los 100 caracteres."
        );
        return false;
    }
    if (!correoPermitido(correo)) {
        mostrarError(correoRegistro, errorCorreoRegistro, "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com."
        );
        return false;
    }
    limpiarError(
        correoRegistro, errorCorreoRegistro
    );
    return true;
}
//para validar las fechas
function validarFechaRegistro() {
    limpiarError(
        fechaRegistro, errorFechaRegistro
    );
    return true;
}
//para validar el n° de telefono
function validarTelefonoRegistro() {
    const telefono = telefonoRegistro.value.trim();
    if (telefono === "") {
        limpiarError(
            telefonoRegistro, errorTelefonoRegistro
        );
        return true;
    }
    //Solo permitimos números, espacios y el signo +
    const patronTelefono = /^\+?[0-9\s]{8,15}$/;
    if (!patronTelefono.test(telefono)) {
        mostrarError(
            telefonoRegistro, errorTelefonoRegistro, "Ingrese un teléfono válido. Ej: +56 9 1234 5678."
        );
        return false;
    }
        limpiarError(
        telefonoRegistro, errorTelefonoRegistro
    );
    return true;
}
//para validar la contraseña
function validarPasswordRegistro() {
    const password = passwordRegistro.value;
    if (estaVacio(password)) {
        mostrarError(
            passwordRegistro, errorPasswordRegistro, "La contraseña es obligatoria."
        );
        return false;
    }
    if (!longitudEntre(password, 4, 10)) {
        mostrarError(
            passwordRegistro, errorPasswordRegistro, "La contraseña debe tener entre 4 y 10 caracteres."
        );
        return false;
    }
    limpiarError(
        passwordRegistro, errorPasswordRegistro
    );
    return true;
}
//confirmar contraseña
function validarConfirmarRegistro() {
    const password = passwordRegistro.value;
    const confirmar = confirmarRegistro.value;
    if (estaVacio(confirmar)) {
        mostrarError(
            confirmarRegistro, errorConfirmarRegistro, "Debe confirmar la contraseña."
        );
        return false;
    }
    if (password !== confirmar) {
        mostrarError(
            confirmarRegistro, errorConfirmarRegistro, "Las contraseñas no coinciden."
        );
        return false;
    }
    limpiarError(
        confirmarRegistro, errorConfirmarRegistro
    );
    return true;
}
//para validar seleccion de region
function validarRegionRegistro() {
    const region = regionRegistro.value;
    if (region === "") {
        mostrarError(
            regionRegistro, errorRegionRegistro, "Debe seleccionar una región."
        );
        return false;
    }
    limpiarError(
        regionRegistro, errorRegionRegistro
    );
    return true;
}
//para validar seleccion de comuna
function validarComunaRegistro() {
    const comuna = comunaRegistro.value;
    if (comuna === "") {
        mostrarError(
            comunaRegistro, errorComunaRegistro, "Debe seleccionar una comuna."
        );
        return false;
    }
    limpiarError(
        comunaRegistro, errorComunaRegistro
    );
    return true;
}
//para validar en tiempo real
runRegistro.addEventListener("input",validarRunRegistro);
nombreRegistro.addEventListener("input",validarNombreRegistro);
apellidosRegistro.addEventListener("input",validarApellidosRegistro);
correoRegistro.addEventListener("input",validarCorreoRegistro);
telefonoRegistro.addEventListener("input",validarTelefonoRegistro);
passwordRegistro.addEventListener("input",function() {
        validarPasswordRegistro();
        if (confirmarRegistro.value !== "") { //si ya se escribio la confirmacion, aqui comprobamos que siga coincidiendo
            validarConfirmarRegistro();
        }
    }
);
confirmarRegistro.addEventListener("input",validarConfirmarRegistro);
regionRegistro.addEventListener("change",validarRegionRegistro);
comunaRegistro.addEventListener("change",validarComunaRegistro);

//enviar formulario y validar cn btn
formularioRegistro.addEventListener("submit",function(event) {
        event.preventDefault();

        const runValido=validarRunRegistro();
        const nombreValido=validarNombreRegistro();
        const apellidosValidos=validarApellidosRegistro();
        const correoValido=validarCorreoRegistro();
        const fechaValida=validarFechaRegistro();
        const telefonoValido=validarTelefonoRegistro();
        const passwordValido=validarPasswordRegistro();
        const confirmarValido=validarConfirmarRegistro();
        const regionValida=validarRegionRegistro();
        const comunaValida=validarComunaRegistro();

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
            alert("Registro realizado correctamente.");
        }
    }
);




