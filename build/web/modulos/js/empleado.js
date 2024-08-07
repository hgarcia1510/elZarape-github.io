let empleados = [];
let valoresOriginales = {};

// Función para generar y mostrar datos
function generarDatos() {
    let cuerpo = "";
    empleados.forEach(function (empleado, index) {
        let registro =
            `<div class="container">
                <div class="row contenido shadow border">
                    <div class="col-5">
                        <label>Datos del Empleado</label><br>
                        <label class="texto form-label">Nombre:</label><br>
                        <input class="datos form-control" type="text" id="nombrePersona_${index}" value="${empleado.nombrePersona}" readonly>
                        <label class="texto form-label">Apellido Paterno:</label><br>
                        <input class="datos form-control" type="text" id="apellidoPaterno_${index}" value="${empleado.apellidoPaterno || ''}" readonly>
                        <label class="texto form-label">Apellido Materno:</label><br>
                        <input class="datos form-control" type="text" id="apellidoMaterno_${index}" value="${empleado.apellidoMaterno || ''}" readonly><br>
                    </div>
                    <div class="col-4">
                        <label>Datos Adicionales</label><br>
                        <label class="texto form-label">Teléfono:</label><br>
                        <input class="datos form-control" type="text" id="telefono_${index}" value="${empleado.telefono}" readonly>
                        <label class="texto form-label">Usuario:</label><br>
                        <input class="datos form-control" type="text" id="usuario_${index}" value="${empleado.usuario}" readonly>
                        <label class="texto form-label">Contraseña:</label><br>
                        <input class="datos form-control" type="text" id="contrasena_${index}" value="${empleado.contrasena}" readonly>
                    </div>
                    <div class="col">
                        <label class="estado">#${empleado.idEmpleado}</label>
                        <p class="estado" id="estatusEmpleado_${index}">${empleado.activo ? 'Activo' : 'Inactivo'}</p>
                        <br><br>
                        ${empleado.activo ?
                            `<button class="btn actualizarBtn" type="button" data-index="${index}"><img height="60px" src="../img/actualizar.png" alt=""></button>
                            <button class="btn eliminarBtn" type="button" data-index="${index}"><img height="60px" src="../img/eliminar.png" alt=""></button><br><br>`
                            :
                            `<button class="btn activarBtn activar" type="button" data-index="${index}">Reactivar</button>`
                        }
                    </div>
                    <label class="direccion">Sucursal donde trabaja:</label><br>                
                    <select class="datos form-select" id="nombreSucursal_${index}" name="nombreSucursal" disabled requerid>
                            <option value="Antorcha" ${empleados.nombreSucursal === "Antorcha" ? "selected" : ""}">Antorcha</option>
                            <option value="Altacia" ${empleados.nombreSucursal === "Altacia" ? "selected" : ""}>Altacia</option>
                            <option value="Galerías" ${empleados.nombreSucursal === "Galerías" ? "selected" : ""}>Galerías</option>
                        </select>       
                </div>
            </div><br>`;
        cuerpo += registro;
    });

    document.getElementById('empleadosContainer').innerHTML = cuerpo;

    // Agregar eventos a los botones actualizados
    Array.from(document.getElementsByClassName('actualizarBtn')).forEach(button => {
        button.addEventListener('click', function () {
            let index = parseInt(button.getAttribute('data-index'));
            activarEdicion(index);
        });
    });

    Array.from(document.getElementsByClassName('eliminarBtn')).forEach(button => {
        button.addEventListener('click', function () {
            let index = parseInt(button.getAttribute('data-index'));
            mostrarConfirmacionEliminar(index);
        });
    });

    Array.from(document.getElementsByClassName('activarBtn')).forEach(button => {
        button.addEventListener('click', function () {
            let index = parseInt(button.getAttribute('data-index'));
            activarEmpleado(index);
        });
    });
}

// Función para activar la edición de un empleado
function activarEdicion(index) {
    let inputs = document.querySelectorAll(`#nombrePersona_${index}, #telefono_${index},
                                                                           #apellidoPaterno_${index}, #apellidoMaterno_${index},
                                                                           #usuario_${index}, #contrasena_${index},
                                                                           #nombreSucursal_${index}`);
    valoresOriginales[index] = {        
        nombrePersona: empleados[index].nombrePersona,
        apellidoPaterno: empleados[index].apellidoPaterno,
        apellidoMaterno: empleados[index].apellidoMaterno,
        telefono: empleados[index].telefono,
        usuario: empleados[index].usuario,
        contrasena: empleados[index].contrasena,
        nombreSucursal: empleados[index].nombreSucursal
    };

    inputs.forEach(input => {
        input.removeAttribute('readonly');
        input.removeAttribute('disabled');
    });

    let aceptarBtn = document.querySelector(`.aceptarBtn[data-index="${index}"]`);
    if (!aceptarBtn) {
        aceptarBtn = document.createElement('button');
        aceptarBtn.classList.add('btn', 'aceptarBtn', 'aceptar');
        aceptarBtn.setAttribute('type', 'button');
        aceptarBtn.setAttribute('data-index', index);
        aceptarBtn.innerHTML = '<img height="60px" src="../img/aceptar.png" alt=""> Aceptar';
        aceptarBtn.addEventListener('click', function () {
            aceptarCambios(index);
        });

        let cancelarBtn = document.createElement('button');
        cancelarBtn.classList.add('btn', 'cancelarBtn', 'cancelar');
        cancelarBtn.setAttribute('type', 'button');
        cancelarBtn.setAttribute('data-index', index);
        cancelarBtn.innerHTML = '<img height="60px" src="../img/cancelar.png" alt=""> Cancelar';
        cancelarBtn.addEventListener('click', function () {
            cancelarCambios(index);
        });

        let col = document.querySelector(`#estatusEmpleado_${index}`).parentNode;
        col.appendChild(aceptarBtn);
        col.appendChild(cancelarBtn);
    } else {
        aceptarBtn.style.display = 'inline-block';
        let cancelarBtn = document.querySelector(`.cancelarBtn[data-index="${index}"]`);
        cancelarBtn.style.display = 'inline-block';
    }

    let actualizarBtn = document.querySelector(`.actualizarBtn[data-index="${index}"]`);
    actualizarBtn.style.display = 'none';

    let eliminarBtn = document.querySelector(`.eliminarBtn[data-index="${index}"]`);
    eliminarBtn.style.display = 'none';
}

// Función para cancelar los cambios en la edición
function cancelarCambios(index) {
    let inputs = document.querySelectorAll(`#nombrePersona_${index}, #telefono_${index},
                                                                          #apellidoPaterno_${index}, #apellidoMaterno_${index},
                                                                          #correo_${index}, #usuario_${index}, #contrasena_${index},
                                                                          #nombreSucursal_${index}`);
    inputs.forEach(input => {
        input.setAttribute('readonly', 'true');
        input.setAttribute('disabled', 'true');
        input.value = valoresOriginales[index][input.id.split('_')[0]];
    });

    let aceptarBtn = document.querySelector(`.aceptarBtn[data-index="${index}"]`);
    aceptarBtn.style.display = 'none';

    let cancelarBtn = document.querySelector(`.cancelarBtn[data-index="${index}"]`);
    cancelarBtn.style.display = 'none';

    let actualizarBtn = document.querySelector(`.actualizarBtn[data-index="${index}"]`);
    actualizarBtn.style.display = 'inline-block';

    let eliminarBtn = document.querySelector(`.eliminarBtn[data-index="${index}"]`);
    eliminarBtn.style.display = 'inline-block';
}

// Función para aceptar los cambios en la edición
function aceptarCambios(index) {
    let nombrePersona = document.querySelector(`#nombrePersona_${index}`).value;
    let apellidoPaterno = document.querySelector(`#apellidoPaterno_${index}`).value;
    let apellidoMaterno = document.querySelector(`#apellidoMaterno_${index}`).value;
    let telefono = document.querySelector(`#telefono_${index}`).value;
    let usuario = document.querySelector(`#usuario_${index}`).value;
    let contrasena = document.querySelector(`#contrasena_${index}`).value;
    let nombreSucursal = document.querySelector(`#nombreSucursal_${index}`).value;

    empleados[index] = {
        ...empleados[index],
        nombrePersona: nombrePersona,
        apellidoPaterno: apellidoPaterno,
        apellidoMaterno: apellidoMaterno,
        telefono: telefono,        
        usuario: usuario,
        contrasena: contrasena,
        nombreSucursal: nombreSucursal
    };

    generarDatos();
}

// Función para mostrar confirmación de eliminación
function mostrarConfirmacionEliminar(index) {
    if (confirm("¿Estás seguro de eliminar este empleado?")) {
        empleados[index].activo = false;
        generarDatos();
    }
}

// Función para activar un empleado
function activarEmpleado(index) {
    empleados[index].activo = true;
    generarDatos();
}

document.addEventListener('DOMContentLoaded', function () {
    // Cargar los datos desde el archivo JSON o tu fuente de datos
    fetch("http://localhost:8081/El_Zarape/modulos/js/datosEmpleado.json")
        .then(response => response.json())
        .then(data => {
            empleados = data;
            generarDatos();
        })
        .catch(error => console.error('Error al cargar datos del JSON:', error));
});

// Función para añadir un nuevo empleado
document.addEventListener('DOMContentLoaded', function () {
    const añadirLink = document.getElementById('añadirLink');
    const modal = document.getElementById('modal');
    const formularioContainer = document.getElementById('formularioContainer');

    añadirLink.addEventListener('click', function (event) {
        event.preventDefault();
        formularioContainer.innerHTML = `               
            <div class="container">
                <h5>Añadir Empleado</h5>
                <form id="formularioAgregar">                    
                    <label class="form-label" for="nombreEmpleado">Nombre</label>
                        <input type="text" class="form-control" id="nombreEmpleado" required>
                    <label class="form-label" for="apellidoPaterno">Apellido Paterno</label>
                        <input type="text" class="form-control" id="apellidoPaterno" required>
                    <label class="form-label" for="apellidoMaterno">Apellido Materno</label>
                        <input type="text" class="form-control" id="apellidoMaterno" required>
                    <label class="form-label" for="telefonoEmpleado">Teléfono</label>
                        <input type="text" class="form-control" id="telefonoEmpleado" required>
                    <label class="form-label" for="correoEmpleado">Correo</label>
                        <input type="email" class="form-control" id="correoEmpleado" required>
                    <label class="form-label" for="usuarioEmpleado">Usuario</label>
                        <input type="text" class="form-control" id="usuarioEmpleado" required>
                    <label class="form-label" for="contrasena">Contraseña</label>
                        <input type="text" class="form-control" id="contrasena" required>
                    <label class="form-label" for="nombreSucursal">Sucursal</label><br>
                        <select class="form-select" id="nombreSucursal" name="nombreSucursal" required>
                            <option value="Antorcha">Antorcha</option>
                            <option value="Altacia">Altacia</option>
                            <option value="Galerías">Galerías</option>
                        </select>                  
                    <div class="text-center">
                        <br>
                        <button class="btn cancelarAñadir cancelar" type="button">Cancelar</button>
                        <button class="btn aceptarAñadir aceptar" type="submit">Añadir</button>
                    </div>
                </form>
            </div>`;
        
        modal.style.display = 'block'; // Mostrar el modal

        const cancelarBtn = formularioContainer.querySelector('.cancelarAñadir');
        cancelarBtn.addEventListener('click', function () {
            modal.style.display = 'none'; // Ocultar el modal
        });

        const formularioAgregar = document.getElementById('formularioAgregar');
        formularioAgregar.addEventListener('submit', function (event) {
            event.preventDefault();
            
            const nuevoEmpleado = {
                idEmpleado:  '0' + (empleados.length+1),
                nombrePersona: formularioAgregar.nombreEmpleado.value,
                apellidoPaterno: formularioAgregar.apellidoPaterno.value,
                apellidoMaterno: formularioAgregar.apellidoMaterno.value,
                telefono: formularioAgregar.telefono.value,
                usuario: formularioAgregar.usuario.value,
                contrasena: formularioAgregar.contrasena.value,
                nombreSucursal: formularioAgregar.nombreSucursal.value,
                foto: '', // Placeholder para la imagen, se asignará dinámicamente
                activo: true
            };

            // Añade el nuevo comando a la lista
            empleados.push(nuevoEmpleado);

            // Ocultar el modal y reiniciar el formulario
            modal.style.display = 'none';
            generarDatos();
            formularioAgregar.reset();
        });

        // Cerrar el modal cuando se haga clic en la 'x'
        const span = document.querySelector('.close');
        span.onclick = function() {
            modal.style.display = 'none';
        };

        // Cerrar el modal cuando se haga clic fuera del contenido
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    });
});
