let pagos = [];
let valoresOriginales = {};

function generarDatos() {
    let cuerpo = "";
    pagos.forEach(function (pago, index) {
        let registro =
            `<div class="container">
                <div class="row contenido shadow border">
        
                    <div class="col-5">
                        <label>Datos del Pago</label><br>
                        <label class="texto form-label">Banco:</label><br>
                        <input class="datos form-control" type="text" id="banco_${index}" value="${pago.banco}" readonly>
                        <label class="texto form-label">Nombre Titular:</label><br>
                        <input class="datos form-control" type="text" id="nombreTitular_${index}" value="${pago.nombreTitular}" readonly>
                        <label class="texto label">Número de Tarjeta:</label><br>
                        <input class="datos form-control" type="text" id="numTarjeta_${index}" value="${pago.numTarjeta}" readonly><br>
                        
                    </div>
                    <div class="col-4">
                        <label class="texto form-label">CVV:</label><br>
                        <input class="datos form-control" type="text" id="cvv_${index}" value="${pago.cvv}" readonly>
                        <label class="texto form-label">Fecha de Vencimiento:</label><br>
                        <input class="datos form-control" type="text" id="fechaVencimiento_${index}" value="${pago.fechaVencimiento}" readonly>
                        <label>Datos Adicionales</label><br>
                        <label class="texto form-label">Id del Cliente:</label><br>
                        <input class="datos form-control" type="text" id="idCliente_${index}" value="${pago.idCliente}" readonly><br>             
                    </div>
                    <div class="col">
                        <label class="estado">#${pago.idPago}</label>
                        <p class="estado" id="estatusPago_${index}">${pago.activo ? 'Activo' : 'Inactivo'}</p>
                        <br><br>
                        ${pago.activo ?
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

    document.getElementById('pagosContainer').innerHTML = cuerpo;

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
            activarPago(index);
        });
    });
}

function activarEdicion(index) {
    let inputs = document.querySelectorAll(`#banco_${index}, #nombreTitular_${index}, #numTarjeta_${index}, #cvv_${index}, #fechaVencimiento_${index}, #idCliente_${index}`);
    valoresOriginales[index] = {
        banco: pagos[index].banco,
        nombreTitular: pagos[index].nombreTitular,
        numTarjeta: pagos[index].numTarjeta,
        cvv: pagos[index].cvv,
        fechaVencimiento: pagos[index].fechaVencimiento,
        idCliente: pagos[index].idCliente
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

        let col = document.querySelector(`#estatusPago_${index}`).parentNode;
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
    let inputs = document.querySelectorAll(`#banco_${index}, #nombreTitular_${index}, #numTarjeta_${index}, #cvv_${index}, #fechaVencimiento_${index}, #idCliente_${index}`);
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
    let banco = document.querySelector(`#banco_${index}`).value;
    let nombreTitular = document.querySelector(`#nombreTitular_${index}`).value;
    let numTarjeta = document.querySelector(`#numTarjeta_${index}`).value;
    let cvv = document.querySelector(`#cvv_${index}`).value;
    let fechaVencimiento = document.querySelector(`#fechaVencimiento_${index}`).value;
    let idCliente = document.querySelector(`#idCliente_${index}`).value;

    // Actualizar los datos del pago
    pagos[index] = {
        ...pagos[index], 
        banco: banco,
        nombreTitular: nombreTitular,
        numTarjeta: numTarjeta,
        cvv: cvv,
        fechaVencimiento: fechaVencimiento,
        idCliente: idCliente
    };

    // Volver a mostrar los datos
    generarDatos();
}

function mostrarConfirmacionEliminar(index) {
    if (confirm("¿Estás seguro de eliminar este pago?")) {
        pagos[index].activo = false; // Cambio a inactivo
        generarDatos();
    }
}

function activarPago(index) {
    pagos[index].activo = true; // Reactivación
    generarDatos();
}

document.addEventListener('DOMContentLoaded', function () {
    // Cargar los datos desde el archivo JSON o tu fuente de datos
    fetch("./js/datosPago.json")
        .then(response => response.json())
        .then(data => {
            pagos = data;
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
                <h5>Añadir Pago</h5>
                <form id="formularioAgregar">                    
                    <label class="form-label" for="banco">Banco</label>
                    <input type="text" class="form-control" id="banco" required>
                    <label class="form-label" for="nombreTitular">Nombre Titular</label>
                    <input type="text" class="form-control" id="nombreTitular" required>
                    <label class="form-label" for="numTarjeta">Número de Tarjeta</label>
                    <input type="text" class="form-control" id="numTarjeta" required>
                    <label class="form-label" for="cvv">CVV</label>
                    <input type="text" class="form-control" id="cvv" required>
                    <label class="form-label" for="fechaVencimiento">Fecha de Vencimiento</label>
                    <input type="text" class="form-control" id="fechaVencimiento" required>
                    <label class="form-label" for="idCliente">ID Cliente</label>
                    <input type="text" class="form-control" id="idCliente" required>
                    <br>
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
            
            const nuevoPago = {
                idPago: '0' + (pagos.lenght + 1),
                banco: formularioAgregar.banco.value,
                nombreTitular: formularioAgregar.nombreTitular.value,
                numTarjeta: formularioAgregar.numTarjeta.value,
                cvv: formularioAgregar.cvv.value,
                fechaVencimiento: formularioAgregar.fechaVencimiento.value,
                idCliente: formularioAgregar.idCliente.value,
                activo: true
            };

            // Añade el nuevo comando a la lista
            pagos.push(nuevoPago);

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
