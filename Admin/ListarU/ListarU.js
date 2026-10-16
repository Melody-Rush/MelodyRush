// 1. OBTENER LOS DATOS DE LOCALSTORAGE
// Buscamos la lista 'misUsuarios'. Si no existe, devolvemos un arreglo vacío [].
let usuariosGuardados = JSON.parse(localStorage.getItem('misUsuarios')) || [];

// 2. BUSCAMOS EL CONTENEDOR EN EL HTML
const cuerpoTabla = document.getElementById('cuerpo-tabla-usuarios');

// 3. FUNCIÓN PARA DIBUJAR LOS USUARIOS
function cargarUsuarios() {
    cuerpoTabla.innerHTML = ""; // Limpiar tabla

    // Si la lista está vacía, mostramos un mensaje en la tabla
    if (usuariosGuardados.length === 0) {
        cuerpoTabla.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 20px;">
                    <strong>No hay usuarios registrados aún.</strong>
                </td>
            </tr>`;
        return; // Detenemos la función aquí
    }

    // Si hay usuarios, los recorremos y dibujamos
    usuariosGuardados.forEach(function(usuario) {
        const filaHTML = `
            <tr>
                <td>${usuario.run}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellidos}</td>
                <td>${usuario.correo}</td>
                <td style="text-transform: uppercase;">${usuario.region}</td>

                <td>
                    <button class="btn-accion" onclick="editarUsuario(${indice})">Editar</button>
                    <button class="btn-accion" onclick="borrarUsuario(${indice})">Borrar</button>
                </td>
            </tr>
        `;
        cuerpoTabla.innerHTML += filaHTML;
    });
}

//funcion para borrar
function borrarUsuario(indice){
    const confirmar=confirm(
        "¿Estás seguro de que quieres eliminar este usuario?"
    );
    if(!confirmar){
        return;
    }
    usuariosGuardados.splice(indice, 1);
    localStorage.setItem(
        "misUsuarios", JSON.stringify(usuariosGuardados)
    );
    //EJECUTAMOS LA FUNCIÓN AL CARGAR LA PÁGINA
    cargarUsuarios();
}

