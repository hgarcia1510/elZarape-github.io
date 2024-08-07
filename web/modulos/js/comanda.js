let comandas = [];
let valoresOriginales = {};

function generarDatos() {
    let cuerpo = "";
    comandas.forEach(function (comanda, index) {
        let registro =
                `<div class="container">
                <div class="row contenido shadow border">
                    <div class="col">
                        <label>Concepto</label><br>
                        <label class="texto form-label">Combo:</label><br>
                        <select class="datos form-select" id="idCombo_${index}" disabled>
                            <option value="N/A" ${comanda.idCombo === "N/A" ? 'selected' : ''}>N/A</option>
                            <option value="Premium" ${comanda.idCombo === "Premium" ? 'selected' : ''}>Premium</option>
                            <option value="Desayuno" ${comanda.idCombo === "Desayuno" ? 'selected' : ''}>Desayuno</option>
                            <option value="Almuerzo" ${comanda.idCombo === "Almuerzo" ? 'selected' : ''}>Almuerzo</option>
                        </select>
                        <label class="texto form-label">Alimento:</label><br>
                        <select class="datos form-select" id="idAlimento_${index}" disabled>
                            <option value="N/A" ${comanda.idAlimento === "N/A" ? 'selected' : ''}>N/A</option>
                            <option value="Chilaquiles" ${comanda.idAlimento === "Chilaquiles" ? 'selected' : ''}>Chilaquiles</option>
                            <option value="Pozole" ${comanda.idAlimento === "Pozole" ? 'selected' : ''}>Pozole</option>
                            <option value="Tamales" ${comanda.idAlimento === "Tamales" ? 'selected' : ''}>Tamales</option>
                        </select>
                        <label class="texto form-label">Bebida:</label><br>
                        <select class="datos form-select" id="idBebida_${index}" disabled>
                            <option value="N/A" ${comanda.idBebida === "N/A" ? 'selected' : ''}>N/A</option>
                            <option value="Agua" ${comanda.idBebida === "Agua" ? 'selected' : ''}>Agua</option>
                            <option value="Refresco" ${comanda.idBebida === "Refresco" ? 'selected' : ''}>Refresco</option>
                            <option value="Café" ${comanda.idBebida === "Café" ? 'selected' : ''}>Café</option>
                            <option value="Jugo" ${comanda.idBebida === "Jugo" ? 'selected' : ''}>Jugo</option>
                        </select>
                    </div>
                    <div class="col">
                        <label>Cantidad</label><br>
                        <label class="texto form-label">Pedido</label><br>
                        <input class="datos form-control" type="text" id="cantidadCombo_${index}" value="${comanda.cantidadCombo}" readonly>
                        <label class="texto form-label">Pedido</label><br>
                        <input class="datos form-control" type="text" id="cantidadAlimento_${index}" value="${comanda.cantidadAlimento}" readonly>
                        <label class="texto form-label">Pedido</label><br>
                        <input class="datos form-control" type="text" id="cantidadBebida_${index}" value="${comanda.cantidadBebida}" readonly>
                    </div>
                    <div class="col">
                        <label>Datos Adicionales</label><br>
                        <label class="texto form-label">id del Cliente:</label><br>
                        <input class="datos form-control" type="text" id="idCliente_${index}" value="${comanda.idCliente}" readonly>
                        <label class="texto form-label">Fecha y Hora:</label><br>
                        <input class="datos form-control" type="text" id="fechaHora_${index}" value="${comanda.fechaHora}" readonly>
                        <label class="texto form-label">Subtotal:</label><br>
                        <input class="datos form-control" type="text" id="subtotal_${index}" value="${comanda.subtotal || 0}" readonly>
                    </div>
                    <div class="col">
                        <label class="estado">#${comanda.idComanda}</label>
                        <p class="estado" id="estatusComanda_${index}">${comanda.activo ? 'Activo' : 'Inactivo'}</p>
                        <br><br>
                        ${comanda.activo ?
                `<button class="btn actualizarBtn" type="button" data-index="${index}"><img height="60px" src="../img/actualizar.png" alt=""></button>
                            <button class="btn eliminarBtn" type="button" data-index="${index}"><img height="60px" src="../img/eliminar.png" alt=""></button><br><br>`
                :
                `<button class="btn activarBtn activar" type="button" data-index="${index}">Reactivar</button>`
                }
                    </div>
                    <label class="direccion">Proceso:</label><br>
                    <select class="datos form-select" id="idProcesoComanda_${index}" name="idProcesoComanda" disabled>
                        <option value="Recibido"${comanda.idProcesoComanda === "Recibido" ? 'selected' : ''}>Recibido</option>
                        <option value="En preparación"${comanda.idProcesoComanda === "En preparación" ? 'selected' : ''}>En preparación</option>
                        <option value="Listo"${comanda.idProcesoComanda === "Listo" ? 'selected' : ''}>Listo</option>
                        <option value="Entregado"${comanda.idProcesoComanda === "Entregado" ? 'selected' : ''}>Entregado</option>
                    </select>
                </div>
            </div><br>`;
        cuerpo += registro;
    });

    document.getElementById('comandasContainer').innerHTML = cuerpo;

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
            activarComanda(index);
        });
    });
}

function agregarListenersPrecios(index) {
    const comboSelect = document.getElementById(`idCombo_${index}`);
    const alimentoSelect = document.getElementById(`idAlimento_${index}`);
    const bebidaSelect = document.getElementById(`idBebida_${index}`);
    const cantidadComboInput = document.getElementById(`cantidadCombo_${index}`);
    const cantidadAlimentoInput = document.getElementById(`cantidadAlimento_${index}`);
    const cantidadBebidaInput = document.getElementById(`cantidadBebida_${index}`);
    const subtotalInput = document.getElementById(`subtotal_${index}`);

    const precios = {
        combo: {
            "Premium": 300,
            "Desayuno": 250,
            "Almuerzo": 200
        },
        alimento: {
            "Chilaquiles": 90,
            "Pozole": 140,
            "Tamales": 40
        },
        bebida: {
            "Agua": 30,
            "Refresco": 20,
            "Café": 40,
            "Jugo": 60
        }
    };

    const calcularSubtotal = () => {
        const cantidadCombo = parseInt(cantidadComboInput.value) || 0;
        const cantidadAlimento = parseInt(cantidadAlimentoInput.value) || 0;
        const cantidadBebida = parseInt(cantidadBebidaInput.value) || 0;

        const precioCombo = precios.combo[comboSelect.value] || 0;
        const precioAlimento = precios.alimento[alimentoSelect.value] || 0;
        const precioBebida = precios.bebida[bebidaSelect.value] || 0;

        const subtotal = (precioCombo * cantidadCombo) + ((precioAlimento * cantidadAlimento) + (precioBebida * cantidadBebida));
        subtotalInput.value = subtotal; // Guardar subtotal en el input correspondiente
        comandas[index].subtotal = subtotal; // Guardar subtotal en la comanda
    };

    comboSelect.addEventListener('change', calcularSubtotal);
    alimentoSelect.addEventListener('change', calcularSubtotal);
    bebidaSelect.addEventListener('change', calcularSubtotal);
    cantidadComboInput.addEventListener('input', calcularSubtotal);
    cantidadAlimentoInput.addEventListener('input', calcularSubtotal);
    cantidadBebidaInput.addEventListener('input', calcularSubtotal);
}



function activarEdicion(index) {
    let inputs = document.querySelectorAll(`#idComanda_${index}, #idCliente_${index},
                        #idAlimento_${index}, #idCombo_${index}, #idBebida_${index}, #descripcionComanda_${index},
                        #cantidadCombo_${index}, #cantidadAlimento_${index},#cantidadBebida_${index},
                        #idProcesoComanda_${index}`);
    valoresOriginales[index] = {
        idComanda: comandas[index].idComanda,
        idCliente: comandas[index].idCliente,
        idCombo: comandas[index].idCombo,
        cantidadCombo: comandas[index].cantidadCombo,
        idAlimento: comandas[index].idAlimento,
        cantidadAlimento: comandas[index].cantidadAlimento,
        idBebida: comandas[index].idBebida,
        cantidadBebida: comandas[index].cantidadBebida,
        idProcesoComanda: comandas[index].idProcesoComanda
    };
    agregarListenersPrecios(index);

    inputs.forEach(input => {
        input.removeAttribute('readonly');
        input.removeAttribute('disabled');
    });

    // Mostrar los botones de aceptar y cancelar
    let aceptarBtn = document.querySelector(`.aceptarBtn[data-index="${index}"]`);
    if (!aceptarBtn) {
        aceptarBtn = document.createElement('button');
        aceptarBtn.classList.add('btn', 'aceptarBtn', 'aceptar');
        aceptarBtn.setAttribute('type', 'button');
        aceptarBtn.setAttribute('data-index', index);
        aceptarBtn.innerHTML = 'Aceptar';
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

        let col = document.querySelector(`#estatusComanda_${index}`).parentNode;
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
    let inputs = document.querySelectorAll(`#idComanda_${index}, #idCliente_${index},
                        #idCombo_${index}, #idAlimento_${index}, #idBebida_${index}, #descripcionComanda_${index},
                        #cantidadCombo_${index}, #cantidadAlimento_${index},#cantidadBebida_${index},
                        #idProcesoComanda_${index} `);
    inputs.forEach(input => {
        input.setAttribute('readonly', 'true');
        input.setAttribute('disabled', 'true');
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
    // Capturar los valores de los inputs que ahora son editables
    let idCliente = document.querySelector(`#idCliente_${index}`).value;
    let idCombo = document.querySelector(`#idCombo_${index}`).value;
    let cantidadCombo = document.querySelector(`#cantidadCombo_${index}`).value;
    let idAlimento = document.querySelector(`#idAlimento_${index}`).value;
    let cantidadAlimento = document.querySelector(`#cantidadAlimento_${index}`).value;
    let idBebida = document.querySelector(`#idBebida_${index}`).value;
    let cantidadBebida = document.querySelector(`#cantidadBebida_${index}`).value;
    let idProcesoComanda = document.querySelector(`#idProcesoComanda_${index}`).value;
    let subtotal = comandas[index].subtotal; // Captura el subtotal calculado

    // Actualizar los datos de la comanda
    comandas[index] = {
        ...comandas[index],
        idCliente,
        idCombo,
        cantidadCombo,
        idAlimento,
        cantidadAlimento,
        idBebida,
        cantidadBebida,
        idProcesoComanda,
        subtotal // Asegúrate de incluir el subtotal aquí
    };

    // Volver a mostrar los datos
    generarDatos();
}


function mostrarConfirmacionEliminar(index) {
    if (confirm("¿Estás seguro de eliminar esta comanda?")) {
        comandas[index].activo = false; // Cambio a inactivo
        generarDatos();
    }
}

function activarComanda(index) {
    comandas[index].activo = true; // Reactivación
    generarDatos();
}

document.addEventListener('DOMContentLoaded', function () {
    // Cargar los datos desde el archivo JSON o tu fuente de datos
    fetch("http://localhost:8081/El_Zarape/modulos/js/datosComanda.json")
            .then(response => response.json())
            .then(data => {
                comandas = data;
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
                <h5>Añadir Comanda</h5>
                    <form id="formularioAgregar">                            
                            <label class="form-label" for="idCliente">ID de Cliente</label>
                            <input type="text" class="form-control" id="idCliente" required>
        
                            <label class="form-label" for="idCombo">Combo</label>
                            <select class="form-select" id="idCombo" name="idCombo">
                                <option value="N/A">N/A</option>
                                <option value="Premium">Premium</option>
                                <option value="Desayuno">Desayuno</option>
                                <option value="Almuerzo">Almuerzo</option>
                            </select>
                            <label class="form-label" for="cantidadCombo">Cantidad de Combos</label>
                            <input type="text" class="form-control" id="cantidadCombo" required>
        
                            <label class="form-label" for="idAlimento">Alimento</label>
                            <select class="form-select" id="idAlimento" name="idAlimento">
                                <option value="N/A">N/A</option>
                                <option value="Chilaquiles">Chilaquiles</option>
                                <option value="Pozole">Pozole</option>
                                <option value="Tamales">Tamales</option>
                            </select>
                            <label class="form-label" for="cantidadAlimento">Cantidad de Alimento</label>
                            <input type="text" class="form-control" id="cantidadAlimento" required>
        
                            <label class="form-label" for="idBebida">Bebida</label>
                            <select class="form-select" id="idBebida" name="idBebida">
                                <option value="N/A">N/A</option>
                                <option value="Agua">Agua</option>
                                <option value="Refresco">Refresco</option>
                                <option value="Café">Café</option>
                                <option value="Jugo">Jugo</option>
                            </select>
                            <label class="form-label" for="cantidadBebida">Cantidad de Bebida</label>
                            <input type="text" class="form-control" id="cantidadBebida" required>
        
                            <label class="form-label" for="idProcesoComanda">Estatus</label>
                            <select class="form-select" id="idProcesoComanda" name="idProcesoComanda">
                                <option value="Recibido">Recibido</option>
                                <option value="En preparación">En preparación</option>
                                <option value="Listo">Listo</option>
                                <option value="Entregado">Entregado</option>
                            </select>
                            <br>
                            <br>
                            <div class="text-center">
                                <button class="btn cancelarAñadir cancelar" type="button">Cancelar</button>
                                <button class="btn aceptarAñadir aceptar" type="submit">Confirmar</button>
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

            function obtenerFechaHoraActual() {
                const ahora = new Date();
                const fecha = ahora.toISOString().split('T')[0]; // YYYY-MM-DD
                const hora = ahora.toTimeString().split(' ')[0]; // HH:MM:SS
                return `${fecha} ${hora}`;
            }

            const cantidadCombo = parseInt(formularioAgregar.cantidadCombo.value) || 0;
            const cantidadAlimento = parseInt(formularioAgregar.cantidadAlimento.value) || 0;
            const cantidadBebida = parseInt(formularioAgregar.cantidadBebida.value) || 0;

            const precios = {
                combo: {
                    "Premium": 300,
                    "Desayuno": 250,
                    "Almuerzo": 200
                },
                alimento: {
                    "Chilaquiles": 90,
                    "Pozole": 140,
                    "Tamales": 40
                },
                bebida: {
                    "Agua": 30,
                    "Refresco": 20,
                    "Café": 40,
                    "Jugo": 60
                }
            };

            const precioCombo = precios.combo[formularioAgregar.idCombo.value] || 0;
            const precioAlimento = precios.alimento[formularioAgregar.idAlimento.value] || 0;
            const precioBebida = precios.bebida[formularioAgregar.idBebida.value] || 0;

            const subtotal = (precioCombo * cantidadCombo) +
                    (precioAlimento * cantidadAlimento) +
                    (precioBebida * cantidadBebida);

            const nuevoComanda = {
                idComanda: '0' + (comandas.length + 1),
                idCliente: formularioAgregar.idCliente.value,
                idAlimento: formularioAgregar.idAlimento.value,
                idBebida: formularioAgregar.idBebida.value,
                idCombo: formularioAgregar.idCombo.value,
                cantidadAlimento: formularioAgregar.cantidadAlimento.value,
                cantidadBebida: formularioAgregar.cantidadBebida.value,
                cantidadCombo: formularioAgregar.cantidadCombo.value,
                fechaHora: obtenerFechaHoraActual(), // Añadir fecha y hora actual
                idProcesoComanda: formularioAgregar.idProcesoComanda.value,
                subtotal: subtotal, // Añadir el subtotal calculado
                activo: true
            };

            // Añade el nuevo comando a la lista
            comandas.push(nuevoComanda);

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
