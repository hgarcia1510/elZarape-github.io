let detalles = [];
let valoresOriginales = {};

function generarDatos() {
    let cuerpo = "";
    detalles.forEach(function (detalle, index) {
        // Verifica que 'detalle' tenga los valores necesarios
        let imagenSrc = detalle.foto ? detalle.foto : `../img/default.jpg`;
        
        let registro =
            `<div class="container">
            <div class="row contenido shadow border">
                <div class="col-9">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <label>Concepto</label><br>
                                <label class="texto form-label">id de Comanda:</label><br>
                                <input class="datos form-control" type="text" id="idComanda_${index}" value="${detalle.idComanda || 'N/A'}" readonly>
                                <label class="texto form-label">Combo:</label><br>
                                <select class="datos form-select" id="nombreCombo_${index}" disabled>
                                    <option value="N/A" ${detalle.nombreCombo === "N/A" ? 'selected' : ''}>N/A</option>
                                    <option value="Premium" ${detalle.nombreCombo === "Premium" ? 'selected' : ''}>Premium</option>
                                    <option value="Desayuno" ${detalle.nombreCombo === "Desayuno" ? 'selected' : ''}>Desayuno</option>
                                    <option value="Almuerzo" ${detalle.nombreCombo === "Almuerzo" ? 'selected' : ''}>Almuerzo</option>
                                </select>
                                <label class="texto form-label">Alimento:</label><br>
                                <select class="datos form-select" id="nombreAlimento_${index}" disabled>
                                    <option value="N/A" ${detalle.nombreAlimento === "N/A" ? 'selected' : ''}>N/A</option>
                                    <option value="Chilaquiles" ${detalle.nombreAlimento === "Chilaquiles" ? 'selected' : ''}>Chilaquiles</option>
                                    <option value="Pozole" ${detalle.nombreAlimento === "Pozole" ? 'selected' : ''}>Pozole</option>
                                    <option value="Tamales" ${detalle.nombreAlimento === "Tamales" ? 'selected' : ''}>Tamales</option>
                                </select>
                                <label class="texto form-label">Bebida:</label><br>
                                <select class="datos form-select" id="nombreBebida_${index}" disabled>
                                    <option value="N/A" ${detalle.nombreBebida === "N/A" ? 'selected' : ''}>N/A</option>
                                    <option value="Agua" ${detalle.nombreBebida === "Agua" ? 'selected' : ''}>Agua</option>
                                    <option value="Refresco" ${detalle.nombreBebida === "Refresco" ? 'selected' : ''}>Refresco</option>
                                    <option value="Café" ${detalle.nombreBebida === "Café" ? 'selected' : ''}>Café</option>
                                    <option value="Jugo" ${detalle.nombreBebida === "Jugo" ? 'selected' : ''}>Jugo</option>
                                </select>     
                            </div>

                            <div class="col">
                                <label>Cantidad</label><br>
                                <label class="texto form-label">Fecha y Hora:</label><br>
                                <input class="datos form-control" type="text" id="fechaHora_${index}" value="${detalle.fechaHora || 'N/A'}" readonly>
                                <label class="texto form-label">Pedido:</label><br>
                                <input class="datos form-control" type="text" id="cantidadCombo_${index}" value="${detalle.cantidadCombo || ''}" readonly>
                                <label class="texto form-label">Pedido:</label><br>
                                <input class="datos form-control" type="text" id="cantidadAlimento_${index}" value="${detalle.cantidadAlimento || ''}" readonly>
                                <label class="texto form-label">Pedido:</label><br>
                                <input class="datos form-control" type="text" id="cantidadBebida_${index}" value="${detalle.cantidadBebida || ''}" readonly>
                            </div>

                            <div class="col">
                                <label>Información del pago</label><br>
                                <label class="texto form-label">Id de Pago:</label><br>
                                <input class="datos form-control" type="text" id="idPago_${index}" value="${detalle.idPago || 'N/A'}" readonly>
                                <label class="texto form-label">Subtotal:</label><br>
                                <input class="datos form-control" type="text" id="subtotal_${index}" value="${detalle.subtotal || 0}" readonly>
                                <label class="texto form-label">IVA:</label><br>
                                <input class="datos form-control" type="text" id="iva_${index}" value="${detalle.iva || 0}" readonly>
                                <label class="texto form-label">Total:</label><br>
                                <input class="datos form-control" type="text" id="total_${index}" value="${detalle.total || 0}" readonly>     
                            </div>

                            <label class="direccion">Sucursal:</label><br>                
                            <select class="datos form-select" id="nombreSucursal_${index}" name="nombreSucursal" disabled requerid>
                                <option value="Antorcha" ${detalle.nombreSucursal === "Antorcha" ? "selected" : ""}">Antorcha</option>
                                <option value="Altacia" ${detalle.nombreSucursal === "Altacia" ? "selected" : ""}>Altacia</option>
                                <option value="Galerías" ${detalle.nombreSucursal === "Galerías" ? "selected" : ""}>Galerías</option>
                            </select>
                            <br>
                        </div>
                    </div>
                </div>

                <div class="col-3 text-end">
                    <label class="estado">#${detalle.idDetalles || 'N/A'}</label>
                        <p class="estado" id="estatusPago_${index}">${detalle.activo ? 'Activo' : 'Inactivo'}</p>                        
                        <div class="col text-center imagen-contenido">
                        <img class="foto" src="${imagenSrc}" alt="${detalle.idDetalles || 'Sin ID'}">
                    </div>
                        <br>
                        ${detalle.activo ?
                            `<button class="btn actualizarBtn" type="button" data-index="${index}"><img height="60px" src="../img/actualizar.png" alt=""></button>
                            <button class="btn eliminarBtn" type="button" data-index="${index}"><img height="60px" src="../img/eliminar.png" alt=""></button><br><br>`
                            :
                            `<button class="btn activarBtn activar" type="button" data-index="${index}">Reactivar</button>`
                        }   
                </div>
            </div><br>`;
        cuerpo += registro;
    });

    document.getElementById('detallesContainer').innerHTML = cuerpo;

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
    let inputs = document.querySelectorAll(`#nombreCombo_${index}, #nombreAlimento_${index},
                                                                        #nombreBebida_${index}, #nombreSucursal_${index},
                                                                        #idPago_${index}, #cantidadCombo_${index},
                                                                        #cantidadAlimento_${index}, #cantidadBebida_${index}`);
    valoresOriginales[index] = {
       nombreCombo: detalles[index].nombreCombo,
       nombreAlimento: detalles[index].nombreAlimento,
       nombreBebida: detalles[index].nombreBebida,
       nombreSucursal: detalles[index].nombreSucursal,
       idPago: detalles[index].idPago,
       cantidadCombo: detalles[index].cantidadCombo,
       cantidadAlimento: detalles[index].cantidadAlimento,
       cantidadBebida: detalles[index].cantidadBebida,
       subtotal: detalles[index].subtotal,
       iva: detalles[index].iva,
       total: detalles[index].total
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
    let inputs = document.querySelectorAll(`#nombreCombo_${index}, #nombreAlimento_${index},
                                                                        #nombreBebida_${index}, #nombreSucursal_${index},
                                                                        #idPago_${index}, #cantidadCombo_${index},
                                                                        #cantidadAlimento_${index}, #cantidadBebida_${index},
                                                                        #subtotal_${index},#iva_${index}, #total_${index}`);
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
    let nombreCombo = document.querySelector(`#nombreCombo_${index}`).value;
    let cantidadCombo = document.querySelector(`#cantidadCombo_${index}`).value;
    let nombreAlimento = document.querySelector(`#nombreAlimento_${index}`).value;
    let cantidadAlimento = document.querySelector(`#cantidadAlimento_${index}`).value;
    let nombreBebida = document.querySelector(`#nombreBebida_${index}`).value;
    let cantidadBebida = document.querySelector(`#cantidadBebida_${index}`).value;
    let idPago = document.querySelector(`#idPago_${index}`).value;
    let nombreSucursal = document.querySelector(`#nombreSucursal_${index}`).value;
    let subtotal = document.querySelector(`#subtotal_${index}`).value;

    // Actualizar los datos del detalle
    detalles[index] = {
        ...detalles[index],
        nombreCombo,
        cantidadCombo,
        nombreAlimento,
        cantidadAlimento,
        nombreBebida,
        cantidadBebida,
        idPago,
        nombreSucursal,
        subtotal
    };

    // Volver a mostrar los datos
    generarDatos();
}

function mostrarConfirmacionEliminar(index) {
    if (confirm("¿Estás seguro de eliminar este detalle?")) {
        detalles[index].activo = false; // Cambio a inactivo
        generarDatos();
    }
}

function activarPago(index) {
    detalles[index].activo = true; // Reactivación
    generarDatos();
}

function agregarListenersPrecios(index) {
    const comboSelect = document.getElementById(`nombreCombo_${index}`);
    const alimentoSelect = document.getElementById(`nombreAlimento_${index}`);
    const bebidaSelect = document.getElementById(`nombreBebida_${index}`);
    const cantidadComboInput = document.getElementById(`cantidadCombo_${index}`);
    const cantidadAlimentoInput = document.getElementById(`cantidadAlimento_${index}`);
    const cantidadBebidaInput = document.getElementById(`cantidadBebida_${index}`);
    const subtotalInput = document.getElementById(`subtotal_${index}`);
    const ivaInput = document.getElementById(`iva_${index}`);
    const totalInput = document.getElementById(`total_${index}`);

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
        
        const suma = (precioAlimento * cantidadAlimento) + (precioBebida * cantidadBebida);
        const descuento = suma * 0.10;
        const subtotal = (precioCombo * cantidadCombo) + (suma - descuento);
        
        const iva = subtotal * 0.16;
        const total = iva + subtotal;
                                
        subtotalInput.value = subtotal; // Guardar subtotal en el input correspondiente
        ivaInput.value = iva; // Guardar IVA en el input correspondiente
        totalInput.value = total; // Guardar total en el input correspondiente

        detalles[index].subtotal = subtotal; // Guardar subtotal en la comanda
        detalles[index].iva = iva; // Guardar IVA en la comanda
        detalles[index].total = total; // Guardar total en la comanda
        
    };

    comboSelect.addEventListener('change', calcularSubtotal);
    alimentoSelect.addEventListener('change', calcularSubtotal);
    bebidaSelect.addEventListener('change', calcularSubtotal);
    cantidadComboInput.addEventListener('input', calcularSubtotal);
    cantidadAlimentoInput.addEventListener('input', calcularSubtotal);
    cantidadBebidaInput.addEventListener('input', calcularSubtotal);
}

document.addEventListener('DOMContentLoaded', function () {
    // Cargar los datos desde el archivo JSON o tu fuente de datos
    fetch("http://localhost:8081/El_Zarape/modulos/js/datosDetalle.json")
        .then(response => response.json())
        .then(data => {
            detalles = data;
            generarDatos();
        })
        .catch(error => console.error('Error al cargar datos del JSON:', error));
});
