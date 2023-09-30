function menuShow() {
  const menuMobile = document.querySelector('.mobile-menu');

  if (menuMobile.classList.contains('open')) {
    menuMobile.classList.remove('open');
    document.querySelector('.icon-header').src = '/pages/icons/menu-mobile.png';
  } else {
    menuMobile.classList.add('open');
    document.querySelector('.icon-header').src = '/pages/icons/close.png';
  }
}
