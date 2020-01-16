import {
  handleBtnLevelClick,
  handleSelectClick
} from "./SelectLevelValidation";

export let Level = {
  render: async () => {
    let { userChoice } = localStorage;
    let userContent = userChoice;

    if (userContent == "games") userContent = "Video Games";
    else if (userContent == "board_game") userContent = "board games";

    let view = /*html*/ `
        <header class="category">
        <img src='./quiz-app/img/${userChoice}.png' class="category__picture" alt=${userChoice}>
        <span class="category__content">${userContent}</span>
        <button class="category__exit"></button>

    </header>
    <section class="section">
        <h1 class="section__title">select level</h1>
        <div class="section__level">easy</div>
        <div class="section__level">medium</div>
        <div class="section__level">hard</div>
    </section>
    <button class="select">select</button>
        `;
    return view;
  },
  after_render: async () => {
    const divs_level = [...document.querySelectorAll(".section__level")];
    const btn_level = document.querySelector(".select");
    btn_level.addEventListener("click", () => handleBtnLevelClick(divs_level));
    divs_level.forEach((div, index) =>
      div.addEventListener("click", () => handleSelectClick(divs_level, index))
    );

    document
      .querySelector(".select")
      .addEventListener("click", () => (window.location = "/#/startGame"));

    document
      .querySelector(".category__exit")
      .addEventListener("click", () => (window.location = "/"));
  }
};
