// API - https://opentdb.com/api.php?amount=10&type=multiple
import "./sass/style.scss";
import { pathSettings } from "./components/pathSettings";
import { handleBtnClick } from "./components/navigation";
import {
  handleCategoryClick,
  handleSubmitCategory
} from "./components/CategoriesValidation";

pathSettings("/");

const btn = document.querySelector(".nav__hamburger-btn");
const menu = document.querySelector(".menu");
const list = document.querySelectorAll(".menu__item");
// HAMBURGER
btn.addEventListener("click", () => handleBtnClick(btn, menu, list));

// CATEGORY CHOICE

const divs = [...document.querySelectorAll(".categories__option")];
const btn_category = document.querySelector(".select");

divs.forEach((div, index) => {
  div.addEventListener("click", () =>
    handleCategoryClick(divs, btn_category, index)
  );
});
btn_category.addEventListener("click", () => handleSubmitCategory(divs));
