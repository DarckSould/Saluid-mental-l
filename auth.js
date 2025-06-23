import { API_AUTH } from './config.js';
import { API_TEMAS } from './config.js';
import { cargarTemas } from './foro.js'; // Asegúrate de que esta función esté exportada

export async function registrarUsuario(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombreRegistro').value.trim();
  const email = document.getElementById('emailRegistro').value.trim();
  const password = document.getElementById('passwordRegistro').value.trim();

  try {
    const res = await fetch(`${API_AUTH}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al registrar');

    alert('Registro exitoso. Ya puedes iniciar sesión.');
    document.getElementById('formRegistro').reset();
    mostrarPantalla('login');
  } catch (err) {
    alert(err.message);
  }
}

export async function iniciarSesion(event) {
  event.preventDefault();
  const email = document.getElementById('emailLogin').value.trim();
  const password = document.getElementById('passwordLogin').value.trim();

  try {
    const res = await fetch(`${API_AUTH}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Credenciales incorrectas');

    alert('Inicio de sesión exitoso.');
    document.getElementById('errorLogin').textContent = '';
    mostrarPantalla('temas');
    document.getElementById('btnLogin').classList.add('hidden');
    document.getElementById('btnRegistro').classList.add('hidden');
    document.getElementById('btnLogout').classList.remove('hidden');
    document.getElementById('btnForo').classList.remove('hidden');
    document.getElementById('btnEvaluaciones').classList.remove('hidden');
    document.getElementById('btnGuias').classList.remove('hidden');
    document.getElementById('btnAgenda').classList.remove('hidden');
    cargarTemas(); // si tienes temas en el foro
  } catch (err) {
    document.getElementById('errorLogin').textContent = err.message;
  }
}

export async function cerrarSesion() {
  try {
    await fetch(`${API_AUTH}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (err) {
    console.warn('Error al cerrar sesión:', err);
  }

  alert('Sesión cerrada.');
  mostrarPantalla('login');
  document.getElementById('btnLogin').classList.remove('hidden');
  document.getElementById('btnRegistro').classList.remove('hidden');
  document.getElementById('btnLogout').classList.add('hidden');
  document.getElementById('btnForo').classList.add('hidden');
  document.getElementById('btnEvaluaciones').classList.add('hidden');
  document.getElementById('btnGuias').classList.add('hidden');
  document.getElementById('btnAgenda').classList.add('hidden');
}
