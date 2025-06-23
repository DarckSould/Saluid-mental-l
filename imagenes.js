function cargarImagenes(carpeta) {
  const contenedor = document.getElementById('contenedorImagenes');
  contenedor.innerHTML = ''; // Limpiar antes

  // Lista de nombres de imágenes que quieras mostrar. Podrías obtenerla dinámicamente con un backend.
  const imagenes = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg']; // Personaliza según tus imágenes

  imagenes.forEach((nombre) => {
    const img = document.createElement('img');
    img.src = `assets/${carpeta}/${nombre}`;
    img.alt = nombre;
    img.className = 'w-full h-auto rounded shadow';
    contenedor.appendChild(img);
  });
}

function cargarImagenes2(carpeta) {
  const contenedor = document.getElementById('contenedorImagenes');
  contenedor.innerHTML = ''; // Limpiar antes

  // Lista de nombres de imágenes que quieras mostrar. Podrías obtenerla dinámicamente con un backend.
  const imagenes = ['img5.jpg', 'img6.jpg']; // Personaliza según tus imágenes

  imagenes.forEach((nombre) => {
    const img = document.createElement('img');
    img.src = `assets/${carpeta}/${nombre}`;
    img.alt = nombre;
    img.className = 'w-full h-auto rounded shadow';
    contenedor.appendChild(img);
  });
}
