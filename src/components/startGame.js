//import { index } from "../index";
let counter = 0;

const handleIndexChange = () => {
  ++counter;
  startGame.after_render();
};

export let startGame = {
  render: async () => {
    const { userChoice } = localStorage;
    let userContent = userChoice;

    let view = /*html*/ `
    <header class="category">
    <img src='img/${userChoice}.png' class="category__picture" alt=${userChoice}>
    <span class="category__content">${userContent}</span>
    <button class="category__exit"></button>

</header>
<section class="section">
  <div class="section__info">
      <span class="section__info-length">Quiz:10</span>
      <span class="section__info-time">03:00 min</span>
  </div>
  <div class="section__question">
  <p class="section__question-text"></p>

    <div class="answers">
        <div class="answers__answer"><span class="answers__answer-number">a</span><span class="answers__answer-text"></span></div>
        <div class="answers__answer"><span class="answers__answer-number">b</span><span class="answers__answer-text"></span></div>
        <div class="answers__answer"><span class="answers__answer-number">c</span><span class="answers__answer-text"></span></div>
        <div class="answers__answer"><span class="answers__answer-number">d</span><span class="answers__answer-text"></span></div>
    </div>
  </div>
</section>
<button class="select">submit</button>
      `;

    return view;
  },
  after_render: async () => {
    const question_text = document.querySelector(".section__question-text");
    const answers_elements = document.querySelectorAll(".answers__answer-text");

    const { userChoice, userLevel, userCategory } = localStorage;
    const url = `https://opentdb.com/api.php?amount=10&type=multiple&category=${userCategory}&difficulty=${userLevel.toLowerCase()}`;
    console.log(url);
    //const wrapper = document.querySelector(".wrapper");
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();

    const {
      category,
      question,
      type,
      correct_answer,
      incorrect_answers: answers,
      difficulty
    } = data.results[counter];
    answers.push(correct_answer);
    const btn = document.querySelector(".select");
    btn.addEventListener("click", handleIndexChange);

    question_text.innerText = question;
    console.log(answers_elements, answers);
    answers_elements.forEach(
      (answer, index) => (answer.innerText = answers[index])
    );
  }
};
