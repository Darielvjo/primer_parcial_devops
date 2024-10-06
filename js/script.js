let indiceEdicion = -1;

function agregarEstudiante() {

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;   

    const matricula = document.getElementById('matricula').value;
    const   
 calificacion = document.getElementById('calificacion').value;

    if (nombre === '' || apellido === '' || matricula === '' || calificacion === '') {
        alert('Todos los campos son obligatorios');
        return;
    }

    const tabla = document.getElementById('tablaEstudiantes').getElementsByTagName('tbody')[0];

    if (indiceEdicion === -1) {
        const nuevaFila = tabla.insertRow();
        nuevaFila.classList.add('nueva-fila');
        nuevaFila.insertCell(0).innerText = nombre;
        nuevaFila.insertCell(1).innerText = apellido;
        nuevaFila.insertCell(2).innerText = matricula;
        nuevaFila.insertCell(3).innerText = calificacion;
        const celdaAcciones = nuevaFila.insertCell(4);

        celdaAcciones.innerHTML = '<button class="boton-accion editar">Editar</button><button class="boton-accion eliminar">Eliminar</button>';

        agregarEventosAccion(nuevaFila, nuevaFila.rowIndex - 1);
    } else {
        const fila = tabla.rows[indiceEdicion];
        fila.cells[0].innerText = nombre;
        fila.cells[1].innerText = apellido;
        fila.cells[2].innerText = matricula;
        fila.cells[3].innerText = calificacion;
        indiceEdicion = -1;
    }

    document.getElementById('formularioEstudiante').reset();
}

function agregarEventosAccion(fila, indice) {
    fila.querySelector('.editar').addEventListener('click', function() {
        indiceEdicion = indice;
        const tabla = document.getElementById('tablaEstudiantes').getElementsByTagName('tbody')[0];
        const fila = tabla.rows[indice];
        document.getElementById('nombre').value = fila.cells[0].innerText;
        document.getElementById('apellido').value = fila.cells[1].innerText;
        document.getElementById('matricula').value = fila.cells[2].innerText;
        document.getElementById('calificacion').value = fila.cells[3].innerText;
    });

    fila.querySelector('.eliminar').addEventListener('click', function() {
        const tabla = document.getElementById('tablaEstudiantes').getElementsByTagName('tbody')[0];
        tabla.deleteRow(indice);
        actualizarBotonesAccion();
    });
}

function actualizarBotonesAccion() {
    const filas = document.getElementById('tablaEstudiantes').getElementsByTagName('tbody')[0].rows;
    for (let i = 0; i < filas.length; i++) {
        agregarEventosAccion(filas[i], i);
    }
}

function buscarEnTabla() {
    const input = document.getElementById('buscar');
    const filtro = input.value.toLowerCase();
    const tabla = document.getElementById('tablaEstudiantes');
    const filas = tabla.getElementsByTagName('tr');

    for (let i = 1; i < filas.length; i++) {
        let mostrarFila = false;
        const celdas = filas[i].getElementsByTagName('td');
        for (let j = 0; j < celdas.length - 1; j++) {
            if (celdas[j].innerText.toLowerCase().indexOf(filtro) > -1) {
                mostrarFila = true;
                break;
            }
        }
        filas[i].style.display = mostrarFila ? '' : 'none';
    }
}