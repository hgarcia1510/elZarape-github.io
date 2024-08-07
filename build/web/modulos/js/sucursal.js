let sucursales = [];
let valoresOriginales = {};

function generarDatos() {
    let cuerpo = "";
    sucursales.forEach(function (sucursal, index) {
        let imagenSrc = sucursal.foto ? sucursal.foto : `../img/default.jpg`;

        let registro =
            `<div class="container">
                <div class="row contenido shadow border">
                    <div class="col imagen-contenido">
                        <img class="foto" src="${imagenSrc}" alt="${sucursal.nombreSucursal}">
                    </div>
                    <div class="col">
                        <label class="texto form-label">Nombre:</label><br>
                        <input class="datos form-control" type="text" id="nombreSucursal_${index}" value="${sucursal.nombreSucursal}" readonly>
                        <label class="texto form-label">Horario Entrada:</label><br>
                        <input class="datos form-control" type="text" id="horarioEntrada_${index}" value="${sucursal.horarioEntrada}" readonly>
                        <label class="texto form-label">Horario Salida:</label><br>
                        <input class="datos form-control" type="text" id="horarioSalida_${index}" value="${sucursal.horarioSalida}" readonly>
                    </div>
                    <div class="col">
                        <label class="texto form-label">URL:</label><br>
                        <input class="datos form-control" type="url" id="url_${index}" value="${sucursal.url}" readonly>
                        <label class="texto form-label">Latitud:</label><br>
                        <input class="datos form-control" type="text" id="latitud_${index}" value="${sucursal.latitud}" readonly>
                        <label class="texto form-label">Longitud:</label><br>
                        <input class="datos form-control" type="text" id="longitud_${index}" value="${sucursal.longitud}" readonly>
                    </div>
                    <div class="col">
                        <label class="estado">#${sucursal.idSucursal}</label>
                        <p class="estado" id="estatusSucursal_${index}">${sucursal.activo ? 'Activo' : 'Inactivo'}</p>
                        <br><br>
                        ${sucursal.activo ?
                            `<button class="btn actualizarBtn" type="button" data-index="${index}"><img height="60px" src="../img/actualizar.png" alt=""></button>
                            <button class="btn eliminarBtn" type="button" data-index="${index}"><img height="60px" src="../img/eliminar.png" alt=""></button><br><br>`
                            :
                            `<button class="btn activarBtn activar" type="button" data-index="${index}">Reactivar</button>`
                        }
                    </div>
                    <label class="direccion">Dirección:</label>
                    <input class="direccion-datos form-control" type="text" id="direccion_${index}" value="${sucursal.direccion}" readonly>
                </div>
            </div><br>`;
        cuerpo += registro;
    });

    document.getElementById('sucursalesContainer').innerHTML = cuerpo;

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
            activarSucursal(index);
        });
    });
}

function activarEdicion(index) {
    let inputs = document.querySelectorAll(`#nombreSucursal_${index}, #horarioEntrada_${index}, #horarioSalida_${index}, #url_${index}, #latitud_${index}, #longitud_${index}, #direccion_${index}`);
    valoresOriginales[index] = {
        nombreSucursal: sucursales[index].nombreSucursal,
        horarioEntrada: sucursales[index].horarioEntrada,
        horarioSalida: sucursales[index].horarioSalida,
        url: sucursales[index].url,
        latitud: sucursales[index].latitud,
        longitud: sucursales[index].longitud,
        direccion: sucursales[index].direccion
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

        let col = document.querySelector(`#estatusSucursal_${index}`).parentNode;
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
    let inputs = document.querySelectorAll(`#nombreSucursal_${index}, #horarioEntrada_${index}, #horarioSalida_${index}, #url_${index}, #latitud_${index}, #longitud_${index}, #direccion_${index}`);
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
    let nombreSucursal = document.querySelector(`#nombreSucursal_${index}`).value;
    let horarioEntrada = document.querySelector(`#horarioEntrada_${index}`).value;
    let horarioSalida = document.querySelector(`#horarioSalida_${index}`).value;
    let url = document.querySelector(`#url_${index}`).value;
    let latitud = document.querySelector(`#latitud_${index}`).value;
    let longitud = document.querySelector(`#longitud_${index}`).value;
    let direccion = document.querySelector(`#direccion_${index}`).value;

    // Actualizar los datos de la sucursal
    sucursales[index] = {
        ...sucursales[index],
        nombreSucursal,
        horarioEntrada,
        horarioSalida,
        url,
        latitud,
        longitud,
        direccion
    };

    // Volver a mostrar los datos
    generarDatos();
}

function mostrarConfirmacionEliminar(index) {
    if (confirm("¿Estás seguro de eliminar esta sucursal?")) {
        sucursales[index].activo = false; // Cambio a inactivo
        generarDatos();
    }
}

function activarSucursal(index) {
    sucursales[index].activo = true; // Reactivación
    generarDatos();
}

document.addEventListener('DOMContentLoaded', function () {
    // Cargar los datos desde el archivo JSON o tu fuente de datos
    fetch("http://localhost:8081/El_Zarape/modulos/js/datosSucursal.json")
            .then(response => response.json())
            .then(data => {
                sucursales = data;
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
                <h5>Añadir Sucursal</h5>
                    <form id="formularioAgregar">
                            <label class="form-label" for="nombreSucursal">Nombre de la sucursal</label>
                            <input type="text" class="form-control" id="nombreSucursal" required>
                            <label class="form-label" for="direccion">Dirección</label>
                            <input type="text" class="form-control" id="direccion" required>
                            <label class="form-label" for="latitud">Latitud</label>
                            <input type="text" class="form-control" id="latitud" required>
                            <label class="form-label" for="longitud">Longitud</label>
                            <input type="text" class="form-control" id="longitud" required>
                            <label class="form-label" for="horarioEntrada">Horario Entrada</label>
                            <input type="text" class="form-control" id="horarioEntrada" required>
                            <label class="form-label" for="horarioSalida">Horario Salida</label>
                            <input type="text" class="form-control" id="horarioSalida" required>
                            <label class="form-label" for="url">URL</label>
                            <input type="url" class="form-control" id="url" required>
                            <label class="form-label" for="foto">Foto</label>
                            <input type="file" class="form-control" id="foto" accept="image/*">
                        <div class="text-center">
                            <br>
                            <br>
                            <button class="btn cancelarAñadir cancelar" type="button">Cancelar</button>
                            <button class="btn aceptarAñadir aceptar" type="submit">Confirmar</button>
                        </div>
                    </form>
                </div>
        `;

        modal.style.display = 'block'; // Mostrar el modal

        const cancelarBtn = formularioContainer.querySelector('.cancelarAñadir');
        cancelarBtn.addEventListener('click', function () {
            modal.style.display = 'none'; // Ocultar el modal
        });

        const formularioAgregar = document.getElementById('formularioAgregar');
        formularioAgregar.addEventListener('submit', function(event) {
            event.preventDefault();

            const nuevaSucursal = {
                idSucursal: '0' + (sucursales.length + 1),
                nombreSucursal: formularioAgregar.nombreSucursal.value,
                direccion: formularioAgregar.direccion.value,
                latitud: formularioAgregar.latitud.value,
                longitud: formularioAgregar.longitud.value,
                horarioEntrada: formularioAgregar.horarioEntrada.value,
                horarioSalida: formularioAgregar.horarioSalida.value,
                url: formularioAgregar.url.value,
                foto: '', // Placeholder para la imagen, se asignará dinámicamente
                activo: true
            };

            // Procesar la imagen seleccionada
            const fotoInput = formularioAgregar.foto;
            if (fotoInput.files.length > 0) {
                const fotoFile = fotoInput.files[0];
                const reader = new FileReader();
                reader.onload = function(event) {
                    nuevaSucursal.foto = event.target.result;
                    sucursales.push(nuevaSucursal);
                    modal.style.display = 'none';
                    generarDatos();
                    formularioAgregar.reset();
                };
                reader.readAsDataURL(fotoFile);
            } else {
                // Si no se seleccionó imagen, se añadirá con imagen por defecto
                nuevaSucursal.foto = '../img/default.jpg';
                sucursales.push(nuevaSucursal);
                modal.style.display = 'none';
                generarDatos();
                formularioAgregar.reset();
            }
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
