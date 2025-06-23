import { API_CITAS } from './config.js';

export async function agendarCita(event) {
  event.preventDefault();
  const fecha = document.getElementById('fechaCita').value;
  const motivo = document.getElementById('motivoCita').value.trim();

  try {
    const res = await fetch(API_CITAS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ fecha, motivo }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al agendar la cita');
    document.getElementById('respuestaCita').textContent =
      '✅ Cita agendada con éxito';
    document.getElementById('formCita').reset();
  } catch (err) {
    document.getElementById('respuestaCita').textContent = `❌ ${err.message}`;
  }
}
