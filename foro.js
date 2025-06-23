// foro.js
import { API_TEMAS, API_MENSAJES, SOCKET_URL } from './config.js';
const socket = io(SOCKET_URL, { withCredentials: true });

let temaActivoId = null;

export async function cargarTemas() {
  const lista = document.getElementById('listaTemas');
  lista.innerHTML = '<p>Cargando...</p>';
  try {
    const res = await fetch(API_TEMAS, { credentials: 'include' });
    const temas = await res.json();
    lista.innerHTML = '';
    temas.forEach((t) => {
      const div = document.createElement('div');
      div.className = 'tema';
      div.innerHTML = `
        <strong>${t.titulo}</strong> - ${t.descripcion}
        <button onclick="abrirTema('${t._id}')" class="ml-2 px-2 py-1 bg-blue-500 text-white rounded text-sm">Ver</button>
      `;
      lista.appendChild(div);
    });
  } catch (err) {
    lista.innerHTML = '<p>Error al cargar temas</p>';
  }
}

export function abrirTema(id) {
  temaActivoId = id;
  cargarMensajes(id);
  document.getElementById('mensajesSection').style.display = 'block';
}

async function cargarMensajes(temaId) {
  const contenedor = document.getElementById('listaMensajes');
  contenedor.innerHTML = '<p>Cargando mensajes...</p>';
  try {
    const res = await fetch(`${API_MENSAJES}/${temaId}`, {
      credentials: 'include',
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

export async function publicarMensaje() {
  const input = document.getElementById('nuevoMensaje');
  const contenido = input.value.trim();
  if (!contenido || !temaActivoId) return alert('Debes iniciar sesión');

  try {
    const res = await fetch(API_MENSAJES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ contenido, temaId: temaActivoId }),
    });
    if (!res.ok) throw new Error('No autorizado');
    input.value = '';
  } catch (err) {
    alert('Error al enviar mensaje');
  }
}

export async function crearTema() {
  const titulo = document.getElementById('tituloTema').value.trim();
  const descripcion = document.getElementById('descripcionTema').value.trim();
  if (!titulo || !descripcion) return alert('Completa todos los campos');

  try {
    const res = await fetch(API_TEMAS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ titulo, descripcion }),
    });
    if (!res.ok) throw new Error('Error al crear tema');
    document.getElementById('tituloTema').value = '';
    document.getElementById('descripcionTema').value = '';
  } catch (err) {
    alert('Error al crear tema');
  }
}

// Eventos socket
socket.on('nuevo-tema', cargarTemas);
socket.on('tema-editado', cargarTemas);
socket.on('tema-eliminado', cargarTemas);
socket.on('tema-cerrado', cargarTemas);
socket.on('nuevo-mensaje', (id) => id === temaActivoId && cargarMensajes(id));
socket.on('mensaje-editado', (id) => id === temaActivoId && cargarMensajes(id));
socket.on(
  'mensaje-eliminado',
  (id) => id === temaActivoId && cargarMensajes(id)
);

// Exportar funciones necesarias
export { temaActivoId };

// ✅ Hacer abrirTema accesible desde HTML (window)
window.abrirTema = abrirTema;
