//Valida os erros email
function onChangeEmail() {
  toggleButtonDisabled();
  toggleEmailErrors();
}

//Valida os erros senha
function onChangePassword() {
  toggleButtonDisabled();
  togglePasswordErrors();
}

//Função para ir a página home com autenticação firebase
function login() {
  showLoading();
  firebase
    .auth()
    .signInWithEmailAndPassword(
      form.emailForm().value,
      form.passwordForm().value
    )
    .then((response) => {
      hideLoading();
      window.location.href = 'home.html';
    })
    .catch((error) => {
      hideLoading();
      alert(getErrorMessage(error));
    });
}

//Função para mostrar erro de senha *Não esta verificando senhas "auth/invalid-login-credentials"
function getErrorMessage(error) {
  if (error.code == 'auth/invalid-login-credentials') {
    
    return 'Usuário não encontrado';
  }
  if (error.code == 'auth/wrong-password') {
    return 'Senha inválida';
  }
  return error.message;
}

function recoverPassword() {
  showLoading();
  firebase
    .auth()
    .sendPasswordResetEmail(form.emailForm().value)
    .then(() => {
      hideLoading();
      alert('E-mail enviado com sucesso');
    })
    .catch((error) => {
      hideLoading();
      alert(getErrorMessage(error));
    });
}

//Função para ir a página registro
function clear() {
  window.location.href = 'register.html';
}

//Se o email é valido ou não
function isEmailValid() {
  const email = form.emailForm().value;
  if (!email) {
    return false;
  }
  return validateEmail(email);
}

//Mostrar ou esconder os erros de email
function toggleEmailErrors() {
  const email = form.emailForm().value;
  form.emailRequiredError().style.display = email ? 'none' : 'block';

  form.emailInvalidError().style.display = validateEmail(email)
    ? 'none'
    : 'block';
}

//Senha obrigatória
function togglePasswordErrors() {
  const password = form.passwordForm().value;
  form.passwordRequiredError().style.display = password ? 'none' : 'block';
}

//Habilitar botão de recuperar e entrar
function toggleButtonDisabled() {
  const emailValid = isEmailValid();
  form.recoverPasswordButton().disabled = !emailValid;

  const passwordValid = isPasswordValid();
  form.loginButton().disabled = !emailValid || !passwordValid;
}

//Se existe algo no campo senha
function isPasswordValid() {
  const password = form.passwordForm().value;
  if (!password) {
    return false;
  }
  return true;
}

//Encapsulaçao de busca repetidas
const form = {
  emailForm: () => document.getElementById('emailForm'),
  emailInvalidError: () => document.getElementById('emailInvalidError'),
  emailRequiredError: () => document.getElementById('emailRequiredError'),
  loginButton: () => document.getElementById('loginButton'),
  passwordForm: () => document.getElementById('passwordForm'),
  passwordRequiredError: () => document.getElementById('passwordRequiredError'),
  recoverPasswordButton: () => document.getElementById('recoverPasswordButton'),
};
