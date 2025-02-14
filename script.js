// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
  };
  
  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Búsqueda de Libros (Google Books API)
  document.getElementById('buscarLibroForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('buscarLibroInput').value;
    const libros = await buscarLibros(query);
    mostrarLibros(libros);
  });
  
  async function buscarLibros(query) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    return data.items;
  }
  
  function mostrarLibros(libros) {
    const resultadosLibros = document.getElementById('resultadosLibros');
    resultadosLibros.innerHTML = libros.map(libro => `
      <div class="libro">
        <h3>${libro.volumeInfo.title}</h3>
        <p>${libro.volumeInfo.authors?.join(', ')}</p>
        <a href="${libro.volumeInfo.previewLink}" target="_blank">Leer más</a>
      </div>
    `).join('');
  }
  
  // Búsqueda de Películas (TMDb API)
  document.getElementById('buscarPeliculaForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('buscarPeliculaInput').value;
    const peliculas = await buscarPeliculas(query);
    mostrarPeliculas(peliculas);
  });
  
  async function buscarPeliculas(query) {
    const apiKey = 'TU_API_KEY_TMDB';
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
    const data = await response.json();
    return data.results;
  }
  
  function mostrarPeliculas(peliculas) {
    const resultadosPeliculas = document.getElementById('resultadosPeliculas');
    resultadosPeliculas.innerHTML = peliculas.map(pelicula => `
      <div class="pelicula">
        <h3>${pelicula.title}</h3>
        <p>${pelicula.overview}</p>
        <img src="https://image.tmdb.org/t/p/w200${pelicula.poster_path}" alt="${pelicula.title}">
      </div>
    `).join('');
  }