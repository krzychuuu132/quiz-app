import { pathSettings } from "./pathSettings";

export const handleCategoryClick = (divs, btn_category, index) => {
  //VALIDATION
  divs.forEach(div => (div.style.backgroundColor = ""));

  // CATEGORIES
  divs.forEach(div => div.classList.remove("categories__option--active"));
  divs[index].classList.add("categories__option--active");

  // BTN
  btn_category.classList.add("select--active");
};

export const handleSubmitCategory = divs => {
  const checking = divs.filter(div =>
    div.className.includes("categories__option--active")
  );

  if (checking.length === 0) {
    divs.forEach(div => (div.style.backgroundColor = "red"));
  } else {
    pathSettings("/#/level");
    console.log(window.localStorage);
  }
};
