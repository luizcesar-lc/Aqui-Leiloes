//Função para proteger paginas de usuarios não autenticados
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = '/pages/html/login.html';
  }
});
