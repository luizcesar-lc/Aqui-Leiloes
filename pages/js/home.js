// Função para logout da página
function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = '/pages/html/login.html';
    })
    .catch(() => {
      alert('Erro ao fazer logout');
    });
}

// Campo de pesquisa
let sugestoes = [
  'carro',
  'smartphone',
  'iphone',
  'samsung',
  'xiaomi',
  'videogame',
  'jogo',
  'celular',
  'bicicleta',
  'musica',
  'cd',
  'maquiagem',
  'roupa',
  'tenis',
  'sandalia',
  'camisa',
  'casaco',
];

const searchWrapper = document.querySelector('.search');
const inputBox = searchWrapper.querySelector('input');
const sugestBox = searchWrapper.querySelector('.list');
const buttonSearch = searchWrapper.querySelector('.searchButton');
let linkTag = searchWrapper.querySelector('a');
let webLink;

inputBox.oninput = (e) => {
  let userData = e.target.value;
  let emptyArray = [];

  if (e.key == 'Enter') {
    if (userData) {
      window.open(`https://www.google.com/search?q=${userData}`);
    }
  }

  if (userData) {
    buttonSearch.onclick = () => {
      webLink = `https://www.google.com/search?q=${userData}`;
      linkTag.setAttribute('href', webLink);
      linkTag.click();
    };
    emptyArray = sugestoes.filter((data) => {
      return data.toLowerCase().startsWith(userData.toLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      return (data = `<li>${data}</li>`);
    });
    searchWrapper.classList.add('active');
    showSuggestions(emptyArray);
    let allList = sugestBox.querySelectorAll('li');
    for (let i = 0; i < allList.length; i++) {
      allList[i].setAttribute('onclick', 'select(this)');
    }
  } else {
    searchWrapper.classList.remove('active');
  }
};

// Função para mostrar sugestões
function showSuggestions(list) {
  let listData;
  if (!list.length) {
    userData = inputBox.value;
    listData = `<li>${userData}</li>`;
  } else {
    listData = list.join('');
  }

  sugestBox.innerHTML = listData;
}
