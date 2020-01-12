export const handleBtnClick = (btn, menu, list) => {
  menu.classList.toggle("menu--active");
  btn.classList.toggle("nav__hamburger-btn--active");

  const interval = setInterval(tick, 200);
  let index = 0;
  function tick() {
    list[index].classList.add("menu__item--active");
    console.log(list.length);

    index++;
    if (index === list.length) {
      clearInterval(interval);
    }
  }
  !btn.className.includes("nav__hamburger-btn--active")
    ? list.forEach(item => item.classList.remove("menu__item--active"))
    : null;
};
