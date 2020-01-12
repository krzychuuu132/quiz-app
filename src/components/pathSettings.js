import { home } from "./Home";
import { handleContact } from "./Contact";
import { about } from "./About";

export const pathSettings = selectPath => {
  const routes = {
    "/": home,
    "/contact": handleContact(),
    "/level": about
  };
  const path = ["/", "/contact", "/about"];
  const rootDiv = document.getElementById("root");
  rootDiv.innerHTML = routes[window.location.pathname];

  const onNavigate = pathname => {
    window.history.pushState({}, pathname, window.location.origin + pathname);
    window.localStorage.setItem("url", pathname);
    rootDiv.innerHTML = routes[pathname];
  };
  onNavigate(selectPath);
  window.onpopstate = () => {
    rootDiv.innerHTML = routes[window.location.pathname];
  };
};
