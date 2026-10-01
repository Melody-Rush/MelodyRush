const formularioRegistro=document.getElementById("formRegistro");
const runRegistro=document.getElementById("runRegistro");
const nombreRegistro=document.getElementById("nombreRegistro");
const apellidosRegistro=document.getElementById("apellidosRegistros");
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

const errorfechaRegistro=document.getElementById("errorfechaRegistro");
const errortelefonoRegistro=document.getElementById("errortelefonoRegistro");
const errorpasswordRegistro=document.getElementById("errorpasswordRegistro");
const errorconfirmarRegistro=document.getElementById("errorconfirmarRegistro");
const errorregionRegistro=document.getElementById("errorregionRegistro");
const errorcomunaRegistro=document.getElementById("errorcomunaRegistro");

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
            runRegistro, errorRunRegistro, "El run debe entre 7 y 9 caracteres."
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

