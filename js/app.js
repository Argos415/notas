document.addEventListener('DOMContentLoaded', function() {
    const botonesContainer = document.getElementById('botones');
    const notaSeleccionada = document.getElementById('notaSeleccionada');
    const searchInput = document.getElementById('search');

    function crearBotones() {
        botonesContainer.innerHTML = ''; // Limpiar botones existentes
        notas.forEach((nota, index) => {
            const boton = document.createElement('button');
            boton.textContent = nota.nombreBoton || `Nota ${index + 1}`;
            boton.classList.add('boton');
            boton.addEventListener('click', () => toggleNota(index, boton));
            botonesContainer.appendChild(boton);
        });
    }

    function toggleNota(index, boton) {
        const nota = notas[index];
        
        // Check if the selected note is already visible
        const isVisible = notaSeleccionada.classList.contains('mostrar') && notaSeleccionada.innerHTML.includes(nota.titulo);

        if (isVisible) {
            // If visible, hide the note
            notaSeleccionada.classList.remove('mostrar');
            notaSeleccionada.classList.add('ocultar');
            setTimeout(() => {
                notaSeleccionada.style.display = 'none';
            }, 500);
            boton.classList.remove('active');
        } else {
            // If not visible, show the note
            notaSeleccionada.innerHTML = `
                <h2>${nota.titulo}</h2>
                <p>${Array.isArray(nota.contenido) ? nota.contenido.join('<br>') : nota.contenido}</p>
            `;

            notaSeleccionada.classList.remove('ocultar');
            notaSeleccionada.classList.add('mostrar');
            notaSeleccionada.style.display = 'block';

            // Desactivar todos los botones y activar el seleccionado
            document.querySelectorAll('.boton').forEach((btn, idx) => {
                btn.classList.toggle('active', idx === index);
            });
        }
    }

    function buscarNotas() {
        const searchTerm = searchInput.value.toLowerCase();
        notas.forEach((nota, index) => {
            const boton = document.querySelectorAll('.boton')[index];
            const contenidoNota = nota.titulo.toLowerCase() + ' ' + 
                (Array.isArray(nota.contenido) ? nota.contenido.join(' ') : nota.contenido).toLowerCase();
            
            if (contenidoNota.includes(searchTerm)) {
                boton.style.display = 'inline-block';
            } else {
                boton.style.display = 'none';
            }
        });

        // Ocultar la nota seleccionada si no coincide con la búsqueda
        if (notaSeleccionada.style.display === 'block') {
            const notaActual = notaSeleccionada.textContent.toLowerCase();
            if (!notaActual.includes(searchTerm)) {
                notaSeleccionada.classList.remove('mostrar');
                notaSeleccionada.classList.add('ocultar');
                setTimeout(() => {
                    notaSeleccionada.style.display = 'none';
                }, 500);
            }
        }
    }

    crearBotones();
    searchInput.addEventListener('input', buscarNotas);
});
