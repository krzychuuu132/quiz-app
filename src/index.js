// API - https://opentdb.com/api.php?amount=10&type=multiple
import "./sass/style.scss";
import { pathSettings } from "./components/pathSettings";
import { handleBtnClick } from "./components/navigation";

pathSettings();

const btn = document.querySelector(".nav__hamburger-btn");
const menu = document.querySelector(".menu");

btn.addEventListener("click", () => handleBtnClick(btn, menu));
