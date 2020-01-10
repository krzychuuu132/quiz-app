import { home } from "./Home";
import { handleContact } from "./Contact";
import { about } from "./About";

export const pathSettings = () => {
  const routes = {
    "/": home,
    "/contact": handleContact(),
    "/about": about
  };
  const path = ["/", "/contact", "/about"];
  const rootDiv = document.getElementById("root");
  rootDiv.innerHTML = routes[window.location.pathname];

  const links = document.querySelectorAll("ul>li>a");

  const onNavigate = pathname => {
    window.history.pushState({}, pathname, window.location.origin + pathname);
    rootDiv.innerHTML = routes[pathname];
  };

  links.forEach((link, index) => {
    link.addEventListener("click", () => onNavigate(path[index]));
  });

  window.onpopstate = () => {
    rootDiv.innerHTML = routes[window.location.pathname];
  };
};
