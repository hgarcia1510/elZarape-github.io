let alimentos = [];
let valoresOriginales = {};

function generarDatos() {
    let cuerpo = "";
    alimentos.forEach(function (alimento, index) {
        let imagenSrc = alimento.foto ? alimento.foto : `../img/default.jpg`;

        let registro =
            `<div class="container">
                <div class="row contenido shadow border">
                    <div class="col imagen-contenido">
                        <img class="foto" src="${imagenSrc}" alt="${alimento.nombreAlimento}">
                    </div>
                    <div class="col">
                        <label class="texto form-label">Nombre:</label><br>
                        <input class="datos form-control" type="text" id="nombreAlimento_${index}" value="${alimento.nombreAlimento}" readonly>
                        <label class="texto form-label">Precio:</label><br>
                        <input class="datos form-control" type="text" id="precioAlimento_${index}" value="${alimento.precioAlimento}" readonly>
                        <label class="texto form-label" for="categoriaAlimento_${index}">Categoría:</label><br>
                        <select class="datos form-select" id="categoriaAlimento_${index}" name="categoriaAlimento" disabled>
                            <option value="Platillo" ${alimento.categoriaAlimento === "Platillo" ? "selected" : ""}>Platillo</option>
                            <option value="Ensalada" ${alimento.categoriaAlimento === "Ensalada" ? "selected" : ""}>Ensalada</option>
                            <option value="Sandwiches" ${alimento.categoriaAlimento === "Sandwiches" ? "selected" : ""}>Sandwiches</option>
                            <option value="Postres" ${alimento.categoriaAlimento === "Postres" ? "selected" : ""}>Postres</option>
                            <option value="Fruta" ${alimento.categoriaAlimento === "Fruta" ? "selected" : ""}>Fruta</option>
                        </select>
                    </div>
                    <div class="col">
                        <label class="estado">#${alimento.idAlimento}</label>
                        <p class="estado" id="estatusAlimento_${index}">${alimento.activo ? 'Activo' : 'Inactivo'}</p>
                        <br><br>
                        ${alimento.activo ?
                            `<button class="btn actualizarBtn" type="button" data-index="${index}"><img height="60px" src="../img/actualizar.png" alt=""></button>
                            <button class="btn eliminarBtn" type="button" data-index="${index}"><img height="60px" src="../img/eliminar.png" alt=""></button><br><br>`
                            :
                            `<button class="btn activarBtn activar" type="button" data-index="${index}">Reactivar</button>`
                        }
                    </div>
                    <label class="direccion">Descripción:</label>
                    <input class="direccion-datos form-control" type="text" id="descripcionAlimento_${index}" value="${alimento.descripcionAlimento}" readonly>
                </div>
            </div><br>`;
        cuerpo += registro;
    });

    document.getElementById('alimentosContainer').innerHTML = cuerpo;

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
            activarAlimento(index);
        });
    });
}

function activarEdicion(index) {
    let inputs = document.querySelectorAll(`#nombreAlimento_${index}, #precioAlimento_${index}, #descripcionAlimento_${index}, #categoriaAlimento_${index}`);
    valoresOriginales[index] = {
        nombreAlimento: alimentos[index].nombreAlimento,
        precioAlimento: alimentos[index].precioAlimento,
        descripcionAlimento: alimentos[index].descripcionAlimento,
        categoriaAlimento: alimentos[index].categoriaAlimento
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
        aceptarBtn.innerHTML = 'Aceptar';
        aceptarBtn.addEventListener('click', function () {
            aceptarCambios(index);
        });

        let cancelarBtn = document.createElement('button');
        cancelarBtn.classList.add('btn', 'cancelarBtn', 'cancelar');
        cancelarBtn.setAttribute('type', 'button');
        cancelarBtn.setAttribute('data-index', index);
        cancelarBtn.innerHTML = 'Cancelar';
        cancelarBtn.addEventListener('click', function () {
            cancelarCambios(index);
        });

        let col = document.querySelector(`#estatusAlimento_${index}`).parentNode;
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
    let inputs = document.querySelectorAll(`#nombreAlimento_${index}, #precioAlimento_${index}, #descripcionAlimento_${index}, #categoriaAlimento_${index}`);
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
    let nombreAlimento = document.querySelector(`#nombreAlimento_${index}`).value;
    let precioAlimento = document.querySelector(`#precioAlimento_${index}`).value;
    let descripcionAlimento = document.querySelector(`#descripcionAlimento_${index}`).value;
    let categoriaAlimento = document.querySelector(`#categoriaAlimento_${index}`).value;

    // Actualizar los datos del alimento
    alimentos[index] = {
        ...alimentos[index],
        nombreAlimento,
        precioAlimento,
        descripcionAlimento,
        categoriaAlimento
    };

    // Volver a mostrar los datos
    generarDatos();
}

function mostrarConfirmacionEliminar(index) {
    if (confirm("¿Estás seguro de eliminar este alimento?")) {
        alimentos[index].activo = false; // Cambio a inactivo
        generarDatos();
    }
}

function activarAlimento(index) {
    alimentos[index].activo = true; // Reactivación
    generarDatos();
}

document.addEventListener('DOMContentLoaded', function () {
    // Cargar los datos desde el archivo JSON o tu fuente de datos
    fetch("http://localhost:8081/El_Zarape/modulos/js/datosAlimento.json")
            .then(response => response.json())
            .then(data => {
                alimentos = data;
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
                <h5>Añadir Alimento</h5>
                    <form id="formularioAgregar">
                            <label class="form-label" for="nombreAlimento">Nombre del alimento</label>
                            <input type="text" class="form-control" id="nombreAlimento" required>
                            <label class="form-label" for="precioAlimento">Precio</label>
                            <input type="text" class="form-control" id="precioAlimento" required>
                            <label class="form-label" for="descripcionAlimento">Descripción</label>
                            <input type="text" class="form-control" id="descripcionAlimento" required>
                            <label class="form-label" for="categoriaAlimento">Categoría</label><br>
                                <select class="form-select" id="categoriaAlimento" name="categoriaAlimento">
                                    <option value="Platillo">Platillo</option>
                                    <option value="Ensalada">Ensalada</option>
                                    <option value="Sandwiches">Sandwiches</option>
                                    <option value="Postres">Postres</option>
                                    <option value="Fruta">Fruta</option>
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

            const nuevoAlimento = {
                idAlimento: '0' + (alimentos.length + 1),
                nombreAlimento: formularioAgregar.nombreAlimento.value,
                precioAlimento: formularioAgregar.precioAlimento.value,
                descripcionAlimento: formularioAgregar.descripcionAlimento.value,
                categoriaAlimento: formularioAgregar.categoriaAlimento.value,
                foto: '', // Placeholder para la imagen, se asignará dinámicamente
                activo: true
            };

            // Procesar la imagen seleccionada
            const fotoInput = formularioAgregar.foto;
            if (fotoInput.files.length > 0) {
                const fotoFile = fotoInput.files[0];
                const reader = new FileReader();
                reader.onload = function(event) {
                    nuevoAlimento.foto = event.target.result;
                    alimentos.push(nuevoAlimento);
                    modal.style.display = 'none';
                    generarDatos();
                    formularioAgregar.reset();
                };
                reader.readAsDataURL(fotoFile);
            } else {
                // Si no se seleccionó imagen, se añadirá con imagen por defecto
                nuevoAlimento.foto = '../img/default.jpg';
                alimentos.push(nuevoAlimento);
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
