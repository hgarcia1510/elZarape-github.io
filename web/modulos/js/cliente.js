let clientes = [];
let valoresOriginales = {};

function generarDatos() {
    let cuerpo = "";
    clientes.forEach(function (cliente, index) {
        let registro =
                `<div class="container">
                <div class="row contenido shadow border">        
                    <div class="col-5">
                        <label>Datos del Cliente</label><br>
                        <label class="texto form-label">Nombre:</label><br>
                        <input class="datos form-control" type="text" id="nombrePersona_${index}" value="${cliente.nombrePersona}" readonly>
                        <label class="texto form-label">Teléfono:</label><br>
                        <input class="datos form-control" type="text" id="telefono_${index}" value="${cliente.telefono}" readonly>
                        <label class="texto form-label">Correo:</label><br>
                        <input class="datos form-control" type="text" id="correo_${index}" value="${cliente.correo}" readonly><br>
                    </div>
                    
                    <div class="col-4">
                        <label>Datos Adicionales</label><br>
                        <label class="texto form-label">Usuario:</label><br>
                        <input class="datos form-control" type="text" id="usuario_${index}" value="${cliente.usuario}" readonly>
                        <label class="texto form-label">Contraseña:</label><br>
                        <input class="datos form-control" type="text" id="contrasena_${index}" value="${cliente.contrasena}" readonly>
                    </div>
                    <div class="col">
                        <label class="estado">#${cliente.idCliente}</label>
                        <p class="estado" id="estatusCliente_${index}">${cliente.activo ? 'Activo' : 'Inactivo'}</p>
                        <br><br>
                        ${cliente.activo ?
                `<button class="btn actualizarBtn" type="button" data-index="${index}"><img height="60px" src="../img/actualizar.png" alt=""></button>
                            <button class="btn eliminarBtn" type="button" data-index="${index}"><img height="60px" src="../img/eliminar.png" alt=""></button><br><br>`
                :
                `<button class="btn activarBtn activar" type="button" data-index="${index}">Reactivar</button>`
                }
                    </div>
                </div>
            </div><br>`;
        cuerpo += registro;
    });

    document.getElementById('clientesContainer').innerHTML = cuerpo;

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
            activarCliente(index);
        });
    });
}

function activarEdicion(index) {
    let inputs = document.querySelectorAll(` #nombrePersona_${index}, #telefono_${index},
                                                                            #correo_${index}, #usuario_${index},
                                                                            #contrasena_${index}`);
    valoresOriginales[index] = {
        nombrePersona: clientes[index].nombrePersona,
        telefono: clientes[index].telefono,
        correo: clientes[index].correo,
        usuario: clientes[index].usuario,
        contrasena: clientes[index].contrasena
    };

    inputs.forEach(input => {
        input.removeAttribute('readonly');
    });

    // Mostrar los botones de aceptar y cancelar
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

        let col = document.querySelector(`#estatusCliente_${index}`).parentNode;
        col.appendChild(aceptarBtn);
        col.appendChild(cancelarBtn);
    } else {
        aceptarBtn.style.display = 'inline-block';
        let cancelarBtn = document.querySelector(`.cancelarBtn[data-index="${index}"]`);
        cancelarBtn.style.display = 'inline-block';
    }

    // Ocultar los botones de actualizar y eliminar
    let actualizarBtn = document.querySelector(`.actualizarBtn[data-index="${index}"]`);
    actualizarBtn.style.display = 'none';

    let eliminarBtn = document.querySelector(`.eliminarBtn[data-index="${index}"]`);
    eliminarBtn.style.display = 'none';
}

function cancelarCambios(index) {
    let inputs = document.querySelectorAll(`#nombrePersona_${index}, #telefono_${index}, #correo_${index}, #usuario_${index}, #contrasena_${index}`);
    inputs.forEach(input => {
        input.setAttribute('readonly', 'true');
        input.value = valoresOriginales[index][input.id.split('_')[0]];
    });

    // Ocultar los botones de aceptar y cancelar
    let aceptarBtn = document.querySelector(`.aceptarBtn[data-index="${index}"]`);
    aceptarBtn.style.display = 'none';

    let cancelarBtn = document.querySelector(`.cancelarBtn[data-index="${index}"]`);
    cancelarBtn.style.display = 'none';

    // Mostrar los botones de actualizar y eliminar
    let actualizarBtn = document.querySelector(`.actualizarBtn[data-index="${index}"]`);
    actualizarBtn.style.display = 'inline-block';

    let eliminarBtn = document.querySelector(`.eliminarBtn[data-index="${index}"]`);
    eliminarBtn.style.display = 'inline-block';
}

function aceptarCambios(index) {   
    let nombrePersona = document.querySelector(`#nombrePersona_${index}`).value;
    let telefono = document.querySelector(`#telefono_${index}`).value;
    let correo = document.querySelector(`#correo_${index}`).value;
    let usuario = document.querySelector(`#usuario_${index}`).value;
    let contrasena = document.querySelector(`#contrasena_${index}`).value;

    // Actualizar los datos del cliente
    clientes[index] = {
        ...clientes[index],
        nombrePersona,
        telefono,
        correo,
        usuario,
        contrasena
    };

    // Volver a mostrar los datos
    generarDatos();
}

function mostrarConfirmacionEliminar(index) {
    if (confirm("¿Estás seguro de eliminar este cliente?")) {
        clientes[index].activo = false; // Cambio a inactivo
        generarDatos();
    }
}

function activarCliente(index) {
    clientes[index].activo = true; // Reactivación
    generarDatos();
}

document.addEventListener('DOMContentLoaded', function () {
    // Cargar los datos desde el archivo JSON o tu fuente de datos
    fetch("./js/datosCliente.json")
            .then(response => response.json())
            .then(data => {
                clientes = data;
                generarDatos();
            })
            .catch(error => console.error('Error al cargar datos del JSON:', error));
});

document.addEventListener('DOMContentLoaded', function () {
    const añadirLink = document.getElementById('añadirLink');
    const modal = document.getElementById('modal');
    const formularioContainer = document.getElementById('formularioContainer');

    añadirLink.addEventListener('click', function (event) {
        event.preventDefault();
        formularioContainer.innerHTML = `               
                <div class="container">
                <h5>Añadir Cliente</h5>
                    <form id="formularioAgregar">                            
                            <label class="form-label" for="nombrePersona">Nombre</label>
                            <input type="text" class="form-control" id="nombrePersona" required>
                            <label class="form-label" for="telefono">Teléfono</label>
                            <input type="text" class="form-control" id="telefono" required>
                            <label class="form-label" for="correo">Correo</label>
                            <input type="email" class="form-control" id="correo" required>
                            <label class="form-label" for="usuario">Usuario</label>
                            <input type="text" class="form-control" id="usuario" required>
                            <label class="form-label" for="contrasena">Contraseña</label>
                            <input type="text" class="form-control" id="contrasena" required>
                            <br>
                            <br>
                            <div class="text-center">
                                <button class="btn cancelarAñadir cancelar" type="button">Cancelar</button>
                                <button class="btn aceptarAñadir aceptar" type="submit">Confirmar</button>
                            </div>
                    </form>
                </div>`;
        
        modal.style.display = 'block';
        
        const cancelarBtn = formularioContainer.querySelector('.cancelarAñadir');
        cancelarBtn.addEventListener('click', function () {
            modal.style.display = 'none'; // Ocultar el modal
        });
        
        const formularioAgregar = document.getElementById('formularioAgregar');
        formularioAgregar.addEventListener('submit', function (event) {
            event.preventDefault();

            const nuevoCliente = {
                idCliente: '0' + (clientes.length + 1),
                nombrePersona: formularioAgregar.nombrePersona.value,
                telefono: formularioAgregar.telefono.value,
                correo: formularioAgregar.correo.value,
                usuario: formularioAgregar.usuario.value,
                contrasena: formularioAgregar.contrasena.value,
                activo: true
            };

            // Añade el nuevo comando a la lista
            clientes.push(nuevoCliente);

            // Ocultar el modal y reiniciar el formulario
            modal.style.display = 'none';
            generarDatos();
            formularioAgregar.reset();
        });

        // Cerrar el modal cuando se haga clic en la 'x'
        const span = document.querySelector('.close');
        if (span) {
            span.onclick = function () {
                modal.style.display = 'none';
            };
        }

        // Cerrar el modal cuando se haga clic fuera del contenido
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    });
});
