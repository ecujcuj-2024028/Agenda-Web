let tareas = [];

function agregarTarea() {
    const texto = document.getElementById('input-tarea').value;
    const prioridad = document.getElementById('inputPrioridad').value;

    if (texto === '') {
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: 'Por favor, escribe una tarea antes de agregarla.',
            confirmButtonColor: '#2f4459'
        });
        return;
    }

    const tareaNueva = {
        id: Date.now(),
        texto: texto,
        prioridad: parseInt(prioridad),
        completada: false
    };

    tareas.push(tareaNueva);
    crearTarea();
    document.getElementById('input-tarea').value = '';

    const Notificacion = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });
    Notificacion.fire({
        icon: 'success',
        title: 'Tarea agregada'
    });
}

function eliminarTarea(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            tareas = tareas.filter(t => t.id !== id);
            crearTarea();
            Swal.fire('¡Eliminado!', 'La tarea ha sido borrada.', 'success');
        }
    });
}

async function editarTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    
    const { value: nuevoTexto } = await Swal.fire({
        title: 'Editar tarea',
        input: 'text',
        inputValue: tarea.texto,
        showCancelButton: true,
        confirmButtonColor: '#2f4459',
        inputValidator: (value) => {
            if (!value) {
                return '¡Debes escribir algo!';
            }
        }
    });

    if (nuevoTexto) {
        tarea.texto = nuevoTexto;
        crearTarea();
        Swal.fire('Actualizado', 'La tarea se modificó correctamente', 'success');
    }
}

function crearTarea() {
    const lista = document.getElementById('listaTareas');
    lista.innerHTML = '';

    tareas.sort((a, b) => b.prioridad - a.prioridad);

    tareas.forEach(tarea => {
        const item = document.createElement('li');
        item.className = `list-group-item priority-${tarea.prioridad}`;

        item.innerHTML = `
            <span class="task-text">${tarea.texto}</span>
            <div>
                <button onclick="editarTarea(${tarea.id})" class="btn btn-sm btn-outline-info btn-action"><i class="fas fa-edit"></i></button>
                <button onclick="eliminarTarea(${tarea.id})" class="btn btn-sm btn-outline-danger btn-action"><i class="fas fa-trash"></i></button>
            </div>
        `;
        lista.appendChild(item);
    });
}