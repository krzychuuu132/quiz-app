export let Finish = {
  render: async () => {
    let view = /*html*/ `
              
                  <header class="header-end" style="background-color:transparent;">
                  <button class="header-end__exit"></button>
                  </header>
                  <main class="main-end">
                  <section class="section-end">
                  
                  <img src="img/trophy.png" alt="trophy" class="section-end__img">
                  <h3 class="section-end__title">Congrats!</h3>
                  <h1 class="section-end__result"></h1>
                  <p class="section-end__text">Quiz completed successfully.</p>
                
                  </section>
                  </main>
                
          `;
    return view;
  },
  after_render: async () => {

    const { userCorrectAnswers } = localStorage;
    const btn_exit = document.querySelector(".header-end__exit");
    btn_exit.classList.add("category__exit");
    btn_exit.addEventListener("click", () => (window.location = "#/"));

    const result_points = (userCorrectAnswers * 100) / 10;

    const result = document.querySelector(".section-end__result");

    if (result_points <= 30) result.style.color = "red";
    else if (result_points > 30 && result_points <= 60)
      result.style.color = "orange";
    else result.style.color = "#2ABC64";

    result.innerText = `${result_points}% Score`;
    
  }
};
