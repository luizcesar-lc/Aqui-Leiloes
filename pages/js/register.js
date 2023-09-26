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

//Função para validar se senhas são iguais
function validatePasswordMatch() {
  const password = form.passwordForm().value;
  const confirmPassword = form.confirmPasswordForm().value;

  form.confirmPasswordDoesntMatchError().style.display =
    password == confirmPassword ? 'none' : 'block';
}

//Habilitar botão dde registrar
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
