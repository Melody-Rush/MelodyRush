/* FUNCIONES GENERALES DE VALIDACION */

function mostrarError(elemento, mensaje){   //mostrar un mensaje de error
    elemento.textContent=mensaje;
}
function limpiarError(elemento){            //limpiar mensaje de error
    elemento.textContent="";
}
function estaVacio(valor){                  //para ver si un campo de text esta vacio
    return valor.trim() === "";
}
function superaMaximo(valor, maximo){       //ver si un texto supera max de caracteres.
    return valor.length>maximo;
}
function longitudEntre(valor, minimo, maximo){           //para ver si esta dentro del rango
    return valor.length>= minimo && valor.length<=maximo;
}
//para verificar el domino permitido
function correoPermitido(correo){
    const patronCorreo= /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return patronCorreo.test(correo);
}