import {
  handleSubmitCategory,
  handleCategoryClick
} from "./CategoriesValidation";

import { handleBtnClick } from "./navigation";

export let Home = {
  render: async () => {
    let view = /*html*/ `
      <header class="header">
      <nav class="nav">
        
              <div class="nav__hamburger">
                  <button class="nav__hamburger-btn"> 
                  <span class="nav__hamburger-line"></span>
                  </button> 
              </div>
          <h1 class="header__h1">quiz app</h1>
          <div class="nav__user"><img src="img/user.png" class="nav__user-img" alt="user"></div>
      </nav>
      
      </header>

  <div class="menu">

            <ul class="menu__list">

                            <li class="menu__item"><a class="menu__link href="#">Home</a></li>
                            <li class="menu__item"><a class="menu__link href="#">Ranking</a></li>
                            <li class="menu__item"><a class="menu__link href="#">About</a></li>
                            
            </ul>

  </div>
  
  <main class="main">
  <section class="statist">
  <div class="statist__content"><span class="statist__content-rank">question count</span><span class="statist__content-counter">230</span></div>
  <div class="statist__content"><span class="statist__content-rank">your ranking</span><span class="statist__content-counter">1250 <span class="fas fa-user statist__content-icon"></span></span></div>
  
  </section>
  <section  class="categories">
      <div class="categories__option" data-name="sport" data-category="21"><img src="img/sport.png" class="categories__option-img">Sports</div>
      <div class="categories__option" data-name="films" data-category="11"><img src="img/films.png" class="categories__option-img">Films</div>
      <div class="categories__option" data-name="games" data-category="15"><img src="img/games.png" class="categories__option-img">Video Games</div>
      <div class="categories__option" data-name="board_game" data-category="16"><img src="img/board_game.png" class="categories__option-img">Board Games</div>
      <div class="categories__option" data-name="computer" data-category="18"><img src="img/computer.png" class="categories__option-img">Computers</div>
      <div class="categories__option" data-name="history" data-category="23"><img src="img/history.png" class="categories__option-img">History</div>
  </section>
  
  
  </main>
  <button class="select" >
  Select
</button>
  `;

    return view;
  },
  after_render: async () => {
    const btn = document.querySelector(".nav__hamburger-btn");
    const menu = document.querySelector(".menu");
    const list = document.querySelectorAll(".menu__item");
    const hamburger = document.querySelector(".nav__hamburger");
    // HAMBURGER
    btn.addEventListener("click", () =>
      handleBtnClick(btn, menu, list, hamburger)
    );

    // CATEGORY CHOICE

    const divs = [...document.querySelectorAll(".categories__option")];
    const btn_category = document.querySelector(".select");

    divs.forEach((div, index) => {
      div.addEventListener("click", () =>
        handleCategoryClick(divs, btn_category, index)
      );
    });
    btn_category.addEventListener("click", () => handleSubmitCategory(divs));
  }
};
//<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
