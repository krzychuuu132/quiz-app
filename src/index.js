// API - https://opentdb.com/api.php?amount=10&type=multiple
import "./sass/style.scss";
import { Error404 } from "./components/Error404";
import { Utils } from "./components/pathSettings";
import { Level } from "./components/Level";
import { Home } from "./components/Home";
import { startGame } from "./components/startGame";
import { Finish } from "./components/finishGame";

const routes = {
  "/": Home,
  "/level": Level,
  "/startGame": startGame,
  "/finish": Finish
};

const router = async () => {
  const content = null || document.getElementById("root");

  let request = Utils.parseRequestURL();

  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/" : "") +
    (request.verb ? "/" + request.verb : "");

  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener("hashchange", router);

window.addEventListener("load", router);
