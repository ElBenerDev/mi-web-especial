// Importa las instancias de Firebase
import { db, storage } from './firebase.js';

// Variables para la paginación
let currentPage = 1;
const limit = 10; // Número de resultados por página

// Función para buscar libros en Open Library
async function buscarLibros(query, page = 1) {
  const response = await fetch(`https://openlibrary.org/search.json?q=${query}&page=${page}&limit=${limit}`);
  const data = await response.json();
  return data;
}

// Mostrar libros en la biblioteca
function mostrarLibros(libros) {
  const librosGrid = document.getElementById('librosGrid');
  libros.forEach(libro => {
    const portada = libro.cover_i 
      ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
      : 'https://via.placeholder.com/150x200?text=Sin+portada';
    const enlace = `https://openlibrary.org${libro.key}`;
    librosGrid.innerHTML += `
      <div class="libro">
        <a href="${enlace}" target="_blank">
          <img src="${portada}" alt="${libro.title}">
          <h3>${libro.title}</h3>
          <p>${libro.author_name?.join(', ') || 'Autor desconocido'}</p>
        </a>
      </div>
    `;
  });
}

// Buscar libros al enviar el formulario
document.getElementById('buscarLibroForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document.getElementById('buscarLibroInput').value;
  const librosGrid = document.getElementById('librosGrid');
  librosGrid.innerHTML = ''; // Limpiar resultados anteriores
  currentPage = 1; // Reiniciar paginación
  const resultados = await buscarLibros(query, currentPage);
  mostrarLibros(resultados.docs);
});

// Cargar más resultados
document.getElementById('cargarMas').addEventListener('click', async () => {
  const query = document.getElementById('buscarLibroInput').value;
  currentPage += 1;
  const resultados = await buscarLibros(query, currentPage);
  mostrarLibros(resultados.docs);
});

// Guardar notas
document.getElementById('notaForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const nota = document.getElementById('notaInput').value;
  db.collection('notas').add({ texto: nota, fecha: new Date() });
  document.getElementById('notaInput').value = '';
});

// Mostrar notas
db.collection('notas').orderBy('fecha', 'desc').onSnapshot((snapshot) => {
  const listaNotas = document.getElementById('listaNotas');
  listaNotas.innerHTML = '';
  snapshot.forEach((doc) => {
    listaNotas.innerHTML += `<li>${doc.data().texto}</li>`;
  });
});

// Subir fotos
document.getElementById('fotoForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const file = document.getElementById('fotoInput').files[0];
  const storageRef = storage.ref(`fotos/${file.name}`);
  storageRef.put(file).then(() => {
    storageRef.getDownloadURL().then((url) => {
      db.collection('fotos').add({ url: url, fecha: new Date() });
    });
  });
});

// Mostrar fotos
db.collection('fotos').orderBy('fecha', 'desc').onSnapshot((snapshot) => {
  const galeriaFotos = document.getElementById('galeriaFotos');
  galeriaFotos.innerHTML = '';
  snapshot.forEach((doc) => {
    galeriaFotos.innerHTML += `<img src="${doc.data().url}" alt="Foto" width="200">`;
  });
});