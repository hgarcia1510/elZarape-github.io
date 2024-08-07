let bebidas = [];
let valoresOriginales = {};

function generarDatos() {
    let cuerpo = "";
    bebidas.forEach(function (bebida, index) {
        let imagenSrc = bebida.foto ? bebida.foto : `../img/default.jpg`;

        let registro =
            `<div class="container">
                <div class="row contenido shadow border">
                    <div class="col imagen-contenido">
                        <img class="foto" src="${imagenSrc}" alt="${bebida.nombreBebida}">
                    </div>
                    <div class="col">
                        <label class="texto form-label">Nombre:</label><br>
                        <input class="datos form-control" type="text" id="nombreBebida_${index}" value="${bebida.nombreBebida}" readonly>
                        <label class="texto form-label">Precio:</label><br>
                        <input class="datos form-control" type="text" id="precioBebida_${index}" value="${bebida.precioBebida}" readonly>
                        <label class="texto form-label" for="categoriaBebida_${index}">Categoría:</label><br>
                        <select class="datos form-select" id="categoriaBebida_${index}" name="categoriaBebida" disabled>
                            <option value="Refresco" ${bebida.categoriaBebida === "Refresco" ? "selected" : ""}>Refresco</option>
                            <option value="Jugos" ${bebida.categoriaBebida === "Jugos" ? "selected" : ""}>Jugos</option>
                            <option value="Café" ${bebida.categoriaBebida === "Café" ? "selected" : ""}>Café</option>
                            <option value="Agua" ${bebida.categoriaBebida === "Agua" ? "selected" : ""}>Agua</option>
                            <option value="Atole" ${bebida.categoriaBebida === "Atole" ? "selected" : ""}>Atole</option>
                        </select>
                    </div>
                    <div class="col">
                        <label class="estado">#${bebida.idBebida}</label>
                        <p class="estado" id="estatusBebida_${index}">${bebida.activo ? 'Activo' : 'Inactivo'}</p>
                        <br><br>
                        ${bebida.activo ?
                            `<button class="btn actualizarBtn" type="button" data-index="${index}"><img height="60px" src="../img/actualizar.png" alt=""></button>
                            <button class="btn eliminarBtn" type="button" data-index="${index}"><img height="60px" src="../img/eliminar.png" alt=""></button><br><br>`
                            :
                            `<button class="btn activarBtn activar" type="button" data-index="${index}">Reactivar</button>`
                        }
                    </div>
                    <label class="direccion">Descripción:</label>
                    <input class="direccion-datos form-control" type="text" id="descripcionBebida_${index}" value="${bebida.descripcionBebida}" readonly>
                </div>
            </div><br>`;
        cuerpo += registro;
    });

    document.getElementById('bebidasContainer').innerHTML = cuerpo;

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
            activarBebida(index);
        });
    });
}

function activarEdicion(index) {
    let inputs = document.querySelectorAll(`#nombreBebida_${index}, #precioBebida_${index}, #descripcionBebida_${index}, #categoriaBebida_${index}`);
    valoresOriginales[index] = {
        nombreBebida: bebidas[index].nombreBebida,
        precioBebida: bebidas[index].precioBebida,
        descripcionBebida: bebidas[index].descripcionBebida,
        categoriaBebida: bebidas[index].categoriaBebida
    };

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

        let col = document.querySelector(`#estatusBebida_${index}`).parentNode;
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
    let inputs = document.querySelectorAll(`#nombreBebida_${index}, #precioBebida_${index}, #descripcionBebida_${index}, #categoriaBebida_${index}`);
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
    let nombreBebida = document.querySelector(`#nombreBebida_${index}`).value;
    let precioBebida = document.querySelector(`#precioBebida_${index}`).value;
    let descripcionBebida = document.querySelector(`#descripcionBebida_${index}`).value;
    let categoriaBebida = document.querySelector(`#categoriaBebida_${index}`).value;

    // Actualizar los datos de la bebida
    bebidas[index] = {
        ...bebidas[index],
        nombreBebida,
        precioBebida,
        descripcionBebida,
        categoriaBebida
    };

    // Volver a mostrar los datos
    generarDatos();
}

function mostrarConfirmacionEliminar(index) {
    if (confirm("¿Estás seguro de eliminar esta bebida?")) {
        bebidas[index].activo = false; // Cambio a inactivo
        generarDatos();
    }
}

function activarBebida(index) {
    bebidas[index].activo = true; // Reactivación
    generarDatos();
}

document.addEventListener('DOMContentLoaded', function () {
    // Cargar los datos desde el archivo JSON o tu fuente de datos
    fetch("./js/datosBebida.json")
            .then(response => response.json())
            .then(data => {
                bebidas = data;
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
                <h5>Añadir Bebida</h5>
                    <form id="formularioAgregar">
                            <label class="form-label" for="nombreBebida">Nombre de la bebida</label>
                            <input type="text" class="form-control" id="nombreBebida" required>
                            <label class="form-label" for="precioBebida">Precio</label>
                            <input type="text" class="form-control" id="precioBebida" required>
                            <label class="form-label" for="descripcionBebida">Descripción</label>
                            <input type="text" class="form-control" id="descripcionBebida" required>
                            <label class="form-label" for="categoriaBebida">Categoría</label><br>
                            <select class="form-select" id="categoriaBebida" name="categoriaBebida">
                                <option value="Refresco">Refresco</option>
                                <option value="Jugos">Jugos</option>
                                <option value="Café">Café</option>
                                <option value="Agua">Agua</option>
                                <option value="Atole">Atole</option>
                            </select>
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

            const nuevoBebida = {
                idBebida:'0'+( bebidas.length + 1),
                nombreBebida: formularioAgregar.nombreBebida.value,
                precioBebida: formularioAgregar.precioBebida.value,
                descripcionBebida: formularioAgregar.descripcionBebida.value,
                categoriaBebida: formularioAgregar.categoriaBebida.value,
                foto: '', // Placeholder para la imagen, se asignará dinámicamente
                activo: true
            };

            // Procesar la imagen seleccionada
            const fotoInput = formularioAgregar.foto;
            if (fotoInput.files.length > 0) {
                const fotoFile = fotoInput.files[0];
                const reader = new FileReader();
                reader.onload = function(event) {
                    nuevoBebida.foto = event.target.result;
                    bebidas.push(nuevoBebida);
                    modal.style.display = 'none';
                    generarDatos();
                    formularioAgregar.reset();
                };
                reader.readAsDataURL(fotoFile);
            } else {
                // Si no se seleccionó imagen, se añadirá con imagen por defecto
                nuevoBebida.foto = '../img/default.jpg';
                bebidas.push(nuevoBebida);
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
