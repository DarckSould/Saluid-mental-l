// config.js
const API_BASE = 'https://backend-salud-mental.onrender.com';

const API_AUTH = `${API_BASE}/auth`;
const API_CITAS = `${API_BASE}/citas`;
const API_EVALUACIONES = `${API_BASE}/evaluaciones`;
const API_TEMAS = `${API_BASE}/temas`;
const API_MENSAJES = `${API_BASE}/mensajes`;

const SOCKET_URL = API_BASE;

export {
  API_AUTH,
  API_CITAS,
  API_EVALUACIONES,
  API_TEMAS,
  API_MENSAJES,
  SOCKET_URL,
};
