const firebaseConfig = {
    apiKey: "AIzaSyAty1AxWlqZImsiHk6OFMCRd8yMrjSgVmc",
    authDomain: "mi-web-especial-63d78.firebaseapp.com",
    projectId: "mi-web-especial-63d78",
    storageBucket: "mi-web-especial-63d78.firebasestorage.app",
    messagingSenderId: "970726261690",
    appId: "1:970726261690:web:ea23b2155be6085999d383"
  };
  
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();
  
  // Exporta las instancias de Firebase
  export { db, storage };