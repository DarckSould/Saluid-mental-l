const API_TEMAS = 'https://backend-salud-mental.onrender.com/temas';
const API_MENSAJES = 'https://backend-salud-mental.onrender.com/mensajes';
const socket = io('https://backend-salud-mental.onrender.com');

socket.on('nuevo-tema', cargarTemas);
socket.on('tema-editado', cargarTemas);
socket.on('tema-eliminado', cargarTemas);
socket.on('tema-cerrado', cargarTemas);

socket.on('nuevo-mensaje', (temaId) => {
  console.log('[socket] nuevo-mensaje recibido para tema:', temaId);
  if (temaId === temaActivoId) {
    console.log('[socket] Recargando mensajes en pantalla');
    cargarMensajes(temaId);
  }
});

socket.on('mensaje-editado', (temaId) => {
  if (temaId === temaActivoId) cargarMensajes(temaId);
});
socket.on('mensaje-eliminado', (temaId) => {
  if (temaId === temaActivoId) cargarMensajes(temaId);
});

let temaActivoId = null;

async function cargarTemas() {
  const lista = document.getElementById('listaTemas');
  lista.innerHTML = '<p>Cargando...</p>';
  try {
    const res = await fetch(API_TEMAS, { credentials: 'include' }); // 👈
    const temas = await res.json();
    lista.innerHTML = '';
    temas.forEach((t) => {
      const div = document.createElement('div');
      div.className = 'tema';
      div.innerHTML = `<strong>${t.titulo}</strong> - ${t.descripcion}
        <button onclick="abrirTema('${t._id}')">Ver</button>`;
      lista.appendChild(div);
    });
  } catch (err) {
    lista.innerHTML = '<p>Error al cargar temas</p>';
  }
}

function abrirTema(id) {
  temaActivoId = id;
  cargarMensajes(id);
  document.getElementById('mensajesSection').style.display = 'block';
}

async function cargarMensajes(temaId) {
  const contenedor = document.getElementById('listaMensajes');
  contenedor.innerHTML = '<p>Cargando mensajes...</p>';
  try {
    const res = await fetch(`${API_MENSAJES}/${temaId}`, {
      credentials: 'include', // 👈
    });
    const mensajes = await res.json();
    contenedor.innerHTML = '';
    mensajes.forEach((m) => {
      const div = document.createElement('div');
      div.className = 'mensaje';
      div.innerHTML = `<strong>${m.usuario.nombre}:</strong> ${m.contenido}`;
      contenedor.appendChild(div);
    });
  } catch (err) {
    contenedor.innerHTML = '<p>Error al cargar mensajes</p>';
  }
}

async function publicarMensaje() {
  const input = document.getElementById('nuevoMensaje');
  const contenido = input.value.trim();

  if (!contenido || !temaActivoId) return alert('Debes iniciar sesión');

  try {
    const res = await fetch(API_MENSAJES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 👈
      body: JSON.stringify({ contenido, temaId: temaActivoId }),
    });

    if (!res.ok) throw new Error('No autorizado');

    input.value = '';
    // ya no hace falta recargar aquí, el socket lo hará
  } catch (err) {
    alert('Error al enviar mensaje');
  }
}

async function crearTema() {
  const titulo = document.getElementById('tituloTema').value.trim();
  const descripcion = document.getElementById('descripcionTema').value.trim();

  if (!titulo || !descripcion) return alert('Completa todos los campos');

  try {
    const res = await fetch(API_TEMAS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 👈
      body: JSON.stringify({ titulo, descripcion }),
    });

    if (!res.ok) throw new Error('Error al crear tema');

    document.getElementById('tituloTema').value = '';
    document.getElementById('descripcionTema').value = '';
    // El socket 'nuevo-tema' se encargará de recargar
  } catch (err) {
    alert('Error al crear tema');
  }
}

document.addEventListener('DOMContentLoaded', cargarTemas);
