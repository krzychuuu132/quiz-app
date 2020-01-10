export const handleBtnClick = (btn, menu) => {
  menu.classList.toggle("menu--active");
  btn.classList.toggle("nav__hamburger-btn--active");
};
