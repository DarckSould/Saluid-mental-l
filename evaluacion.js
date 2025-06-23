import { API_EVALUACIONES } from './config.js';

export async function enviarEvaluacion(event) {
  event.preventDefault();
  const form = document.getElementById('formEvaluacion');
  const formData = new FormData(form);

  const respuestas = [];
  formData.forEach((valor, clave) => {
    const pregunta = form.querySelector(`[name="${clave}"]`)
      .previousElementSibling.textContent;
    respuestas.push({ pregunta, respuesta: valor });
  });

  if (respuestas.length < 5) return alert('Completa todas las preguntas');

  try {
    const res = await fetch(API_EVALUACIONES, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ respuestas }),
    });
    if (!res.ok) throw new Error('Error al enviar evaluación');
    alert('Evaluación enviada correctamente');
    form.reset();
  } catch (err) {
    alert(err.message);
  }
}
