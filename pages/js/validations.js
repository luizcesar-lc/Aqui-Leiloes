//validação de email
function validateEmail(email) {
  return /[a-z0-9_\-]+@[a-z0-9]+\.[a-z]+/.test(email);
}
