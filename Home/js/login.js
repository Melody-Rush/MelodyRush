const formularioLogin=document.getElementById("formLogin"); // p/ llamar al formulario

const correoLogin=document.getElementById("correoLogin"); //llamar los campos
const contrasenaLogin=document.getElementById("contrasenaLogin"); //campo

const errorCorreoLogin=document.getElementById("errorCorreoLogin"); //espacio para errores
const errorContrasenaLogin=document.getElementById("errorContrasenaLogin"); //error

//para validar correo
function validarCorreoLogin(){
    const correo=correoLogin.value.trim();
    if(estaVacio(correo)) {
        mostrarError(errorCorreoLogin, "El correo es OBLIGATORIO.");
        return false;
    }
    if(superaMaximo(correo, 100)) {
        mostrarError(
            errorCorreoLogin, "El correo no puede superar los 100 caracteres. ");
            return false;
    }
    if(!correoPermitido(correo)) {
        mostrarError(errorCorreoLogin, "Solo se permiten correos @duoc.cl, @profesor.duoc.cl ó @gmail.com");
        return false;
    }
    limpiarError(errorCorreoLogin);
    return true;
}

//validar contraseña
function validarContrasenaLogin() {
    const contrasena=contrasenaLogin.value;

    if(estaVacio(contrasena)) {
        mostrarError(errorContrasenaLogin, "La contraseña es OBLIGATORIA. ");
        return false;
    }
    if(!longitudEntre(contrasena, 4, 10)) {
        mostrarError(
            errorContrasenaLogin, "La contraseña debe tener entre 4 y 10 caracteres.");
            return false;
    }
    limpiarError(errorContrasenaLogin);
    return true;
}

//para validar en tiempo real
correoLogin.addEventListener("input", validarCorreoLogin);
contrasenaLogin.addEventListener("input", validarContrasenaLogin);

//validar con botn
formularioLogin.addEventListener("submit", function(event) {
    event.preventDefault();

    const correoValido=validarCorreoLogin();
    const contrasenaValida=validarContrasenaLogin();
    if(correoValido && contrasenaValida) {
        alert("Datos ingresados correctamente. ");
    }
});