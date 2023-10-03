// Para que o usuario continue logado
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    window.location.href = '../../index.html';
  }
});

//Mostrar erro no campo de email
function onChangeEmail() {
  const email = form.emailForm().value;
  form.emailRequiredError().style.display = email ? 'none' : 'block';

  form.emailInvalidError().style.display = validateEmail(email)
    ? 'none'
    : 'block';

  toggleRegisterButtonDisabled();
}

//Mostrar erro no campo de senha
function onChangePassword() {
  const password = form.passwordForm().value;
  form.passwordRequiredError().style.display = password ? 'none' : 'block';

  form.passwordMinLengthError().style.display =
    password.length >= 6 ? 'none' : 'block';

  validatePasswordMatch();

  toggleRegisterButtonDisabled();
}

//Mostrar erro no campo de confirmação dde erro
function onChangeConfirmPassword() {
  validatePasswordMatch();

  toggleRegisterButtonDisabled();
}

//Função para registrar usuario
function register() {
  showLoading();

  const email = form.emailForm().value;
  const password = form.passwordForm().value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      hideLoading();
      window.location.href = '../../index.html';
    })
    .catch((error) => {
      hideLoading();
      alert(getErrorMessage(error));
    });
}

//Função para pegar erro da validação do registro
function getErrorMessage(error) {
  if (error.code == 'auth/email-already-in-use') {
    return 'Email já está em uso';
  }
  return error.message;
}

//Função para validar se senhas são iguais
function validatePasswordMatch() {
  const password = form.passwordForm().value;
  const confirmPassword = form.confirmPasswordForm().value;

  form.confirmPasswordDoesntMatchError().style.display =
    password == confirmPassword ? 'none' : 'block';
}

//Habilitar botão de registrar
function toggleRegisterButtonDisabled() {
  form.registerButton().disabled = !isFormValid();
}

//Validação do formulario
function isFormValid() {
  const email = form.emailForm().value;
  if (!email || !validateEmail(email)) {
    return false;
  }

  const password = form.passwordForm().value;
  if (!password || password.length < 6) {
    return false;
  }

  const confirmPassword = form.confirmPasswordForm().value;
  if (password != confirmPassword) {
    return false;
  }

  return true;
}

//Função para ir a página login
function goLogin() {
  window.location.href = 'login.html';
}

function registerWithGoogle() {
  showLoading();

  // Criar uma instância do provedor do Google
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  // Fazer o login com o Google
  firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .then((result) => {
      // Usuário registrado com sucesso
      hideLoading();
      window.location.href = '../../index.html'; // Redirecionar para a página de login ou outra página após o registro
    })
    .catch((error) => {
      hideLoading();
      alert(getErrorMessage(error));
    });
}

//Encapsulaçao de busca repetidas
const form = {
  emailForm: () => document.getElementById('emailForm'),
  emailInvalidError: () => document.getElementById('emailInvalidError'),
  emailRequiredError: () => document.getElementById('emailRequiredError'),
  passwordForm: () => document.getElementById('passwordForm'),
  passwordMinLengthError: () =>
    document.getElementById('passwordMinLengthError'),
  passwordRequiredError: () => document.getElementById('passwordRequiredError'),
  confirmPasswordForm: () => document.getElementById('confirmPasswordForm'),
  confirmPasswordDoesntMatchError: () =>
    document.getElementById('confirmPasswordDoesntMatchError'),
  registerButton: () => document.getElementById('registerButton'),
};
