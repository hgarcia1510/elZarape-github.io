let combos = [];
let valoresOriginales = {};

function generarDatos() {
    let cuerpo = "";
    combos.forEach(function (combo, index) {
        let imagenSrc = combo.foto ? combo.foto : `../img/default.jpg`;

        let registro =
            `<div class="container">
                <div class="row contenido shadow border">
                    <div class="col imagen-contenido">
                        <img class="foto" src="${imagenSrc}" alt="${combo.nombreCombo}">
                    </div>
                    <div class="col">
                        <label class="texto form-label">Nombre:</label><br>
                        <input class="datos form-control" type="text" id="nombreCombo_${index}" value="${combo.nombreCombo}" readonly>
                        <label class="texto form-label">Precio:</label><br>
                        <input class="datos form-control" type="text" id="precioCombo_${index}" value="${combo.precioCombo}" readonly>
                    </div>
                    <div class="col">
                        <label class="texto form-label">Bebida:</label>
                        <select class="datos form-select" id="idBebida_${index}" disabled>
                            <option value="Agua" ${combo.idBebida === 'Agua' ? 'selected' : ''}>Agua</option>
                            <option value="Café" ${combo.idBebida === 'Café' ? 'selected' : ''}>Café</option>
                            <option value="Jugo" ${combo.idBebida === 'Jugo' ? 'selected' : ''}>Jugo</option>
                        </select>
                        <label class="texto form-label">Alimento:</label>
                        <select class="datos form-select" id="idAlimento_${index}" disabled>
                            <option value="Chilaquiles" ${combo.idAlimento === 'Chilaquiles' ? 'selected' : ''}>Chilaquiles</option>
                            <option value="Pozole" ${combo.idAlimento === 'Pozole' ? 'selected' : ''}>Pozole</option>
                            <option value="Tamales" ${combo.idAlimento === 'Tamales' ? 'selected' : ''}>Tamales</option>
                            <option value="Hot Cakes" ${combo.idAlimento === 'Hot Cakes' ? 'selected' : ''}>Hot Cakes</option>
                            <option value="Burritos" ${combo.idAlimento === 'Burritos' ? 'selected' : ''}>Burritos</option>
                        </select><br>
                        <label class="direccion">Descripción:</label><br>
                        <input class="direccion-datos form-control" type="text" id="descripcionCombo_${index}" value="${combo.descripcionCombo}" readonly>
                    </div>
                    <div class="col">
                        <label class="estado">#${combo.idCombo}</label>
                        <p class="estado" id="estatusCombo_${index}">${combo.activo ? 'Activo' : 'Inactivo'}</p>
                        <br><br>
                        ${combo.activo ?
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

    document.getElementById('combosContainer').innerHTML = cuerpo;

    // Añadir eventos a botones
    document.querySelectorAll('.actualizarBtn').forEach(button => {
        button.addEventListener('click', function () {
            let index = parseInt(button.getAttribute('data-index'));
            activarEdicion(index);
        });
    });

    document.querySelectorAll('.eliminarBtn').forEach(button => {
        button.addEventListener('click', function () {
            let index = parseInt(button.getAttribute('data-index'));
            mostrarConfirmacionEliminar(index);
        });
    });

    document.querySelectorAll('.activarBtn').forEach(button => {
        button.addEventListener('click', function () {
            let index = parseInt(button.getAttribute('data-index'));
            activarCombo(index);
        });
    });
}

function activarEdicion(index) {
    let inputs = document.querySelectorAll(`#nombreCombo_${index}, #precioCombo_${index}, #descripcionCombo_${index}, #idBebida_${index}, #idAlimento_${index}`);
    valoresOriginales[index] = {
        nombreCombo: combos[index].nombreCombo,
        precioCombo: combos[index].precioCombo,
        descripcionCombo: combos[index].descripcionCombo,
        idBebida: combos[index].idBebida,
        idAlimento: combos[index].idAlimento
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

        let col = document.querySelector(`#estatusCombo_${index}`).parentNode;
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
    let inputs = document.querySelectorAll(`#nombreCombo_${index}, #precioCombo_${index}, #descripcionCombo_${index}, #idBebida_${index}, #idAlimento_${index}`);
    inputs.forEach(input => {
        if (input.tagName === 'INPUT') {
            input.setAttribute('readonly', 'true');
            input.setAttribute('disabled', 'true');
            input.value = valoresOriginales[index][input.id.split('_')[0]];
        } else if (input.tagName === 'SELECT') {
            input.setAttribute('disabled', 'true');
            input.value = valoresOriginales[index][input.id.split('_')[0]];
        }
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
    let precioCombo = document.querySelector(`#precioCombo_${index}`).value;
    let descripcionCombo = document.querySelector(`#descripcionCombo_${index}`).value;
    let idBebida = document.querySelector(`#idBebida_${index}`).value;
    let idAlimento = document.querySelector(`#idAlimento_${index}`).value;

    // Actualizar los datos del combo
    combos[index] = {
        ...combos[index],
        nombreCombo,
        precioCombo,
        descripcionCombo,
        idBebida,
        idAlimento
    };

    // Volver a mostrar los datos
    generarDatos();
}

function mostrarConfirmacionEliminar(index) {
    if (confirm("¿Estás seguro de eliminar este combo?")) {
        combos[index].activo = false; // Cambio a inactivo
        generarDatos();
    }
}

function activarCombo(index) {
    combos[index].activo = true; // Reactivación
    generarDatos();
}

document.addEventListener('DOMContentLoaded', function () {
    // Aquí puedes inicializar tus combos
    generarDatos();
});


document.addEventListener('DOMContentLoaded', function () {
    // Cargar los datos desde el archivo JSON o tu fuente de datos
    fetch("./js/datosCombo.json")
        .then(response => response.json())
        .then(data => {
            combos = data;
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
            <h5>Añadir Combo</h5>
                <form id="formularioAgregar">
                    <label class="form-label" for="nombreCombo">Nombre del combo</label>
                    <input type="text" class="form-control" id="nombreCombo" required>
                    <label class="form-label" for="precioCombo">Precio</label>
                    <input type="text" class="form-control" id="precioCombo" required>
                    <label class="form-label" for="descripcionCombo">Descripción</label>
                    <input type="text" class="form-control" id="descripcionCombo" required>
                    <label class="form-label" for="idAlimento">Alimento</label>
                    <select class="form-select" id="idAlimento" name="idAlimento">
                        <option value="Chilaquiles">Chilaquiles</option>
                        <option value="Pozole">Pozole</option>
                        <option value="Tamales">Tamales</option>
                    </select>
                    <label class="form-label" for="idBebida">Bebida</label>
                    <select class="form-select" id="idBebida" name="idBebida">
                        <option value="Agua">Agua</option>
                        <option value="Café">Café</option>
                        <option value="Jugo">Jugo</option>
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

            const nuevoCombo = {
                idCombo: '0' + (combos.length + 1), // Asegura el formato de ID de dos dígitos
                nombreCombo: formularioAgregar.nombreCombo.value,
                precioCombo: formularioAgregar.precioCombo.value,
                descripcionCombo: formularioAgregar.descripcionCombo.value,
                idAlimento: formularioAgregar.idAlimento.value,
                idBebida: formularioAgregar.idBebida.value,
                foto: '', // Placeholder para la imagen, se asignará dinámicamente
                activo: true
            };

            // Procesar la imagen seleccionada
            const fotoInput = formularioAgregar.foto;
            if (fotoInput.files.length > 0) {
                const fotoFile = fotoInput.files[0];
                const reader = new FileReader();
                reader.onload = function(event) {
                    nuevoCombo.foto = event.target.result;
                    combos.push(nuevoCombo);
                    modal.style.display = 'none';
                    generarDatos();
                    formularioAgregar.reset();
                };
                reader.readAsDataURL(fotoFile);
            } else {
                // Si no se seleccionó imagen, se añadirá con imagen por defecto
                nuevoCombo.foto = '../img/default.jpg';
                combos.push(nuevoCombo);
                modal.style.display = 'none';
                generarDatos();
                formularioAgregar.reset();
            }
        });

        // Cerrar el modal cuando se haga clic en la 'x'
        const span = document.querySelector('.close');
        if (span) {
            span.onclick = function() {
                modal.style.display = 'none';
            };
        }

        // Cerrar el modal cuando se haga clic fuera del contenido
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    });
});
