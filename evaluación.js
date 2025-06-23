async function enviarEvaluacion(event) {
  event.preventDefault();

  const form = document.getElementById('formEvaluacion');
  const formData = new FormData(form);

  const respuestas = [];
  formData.forEach((valor, clave) => {
    const textoPregunta = form.querySelector(`[name="${clave}"]`)
      .previousElementSibling.textContent;
    respuestas.push({ pregunta: textoPregunta, respuesta: valor });
  });

  if (respuestas.length < 5) return alert('Completa todas las preguntas');

  try {
    await new Promise((r) => setTimeout(r, 1000));
    const res = await fetch(
      'https://backend-salud-mental.onrender.com/evaluaciones',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ respuestas }),
      }
    );

    if (!res.ok) throw new Error('Error al enviar evaluación');
    alert('Evaluación enviada correctamente');
    form.reset();
  } catch (err) {
    alert(err.message);
  }
}
