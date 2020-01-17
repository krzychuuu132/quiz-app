//import { index } from "../index";
let counter = 0;
const answers_point = ["a", "b", "c", "d"];

const handleIndexChange = () => {
  const { correctAnswer } = localStorage;

  const answers = [...document.querySelectorAll(".answers__answer")];

  const include_active = answers.filter(answer =>
    answer.className.includes("answers__answer--active")
  );
  console.log(localStorage);
  if (include_active.length == 0 || include_active == []) {
    answers.forEach(
      answer => (
        (answer.style.backgroundColor = "red"), (answer.style.color = "white")
      )
    );
  } else {
    const correct_answer = answers.filter(
      answer =>
        answer.firstElementChild.nextElementSibling.innerText === correctAnswer
    );
    const inCorrect_answer = answers.filter(
      answer =>
        answer.firstElementChild.nextElementSibling.innerText !== correctAnswer
    );
    correct_answer[0].style.backgroundColor = "green";
    inCorrect_answer.forEach(answer => (answer.style.backgroundColor = "red"));

    setTimeout(() => {
      answers.forEach(answer => (answer.style.backgroundColor = ""));
      ++counter;
      startGame.after_render();
      answers.forEach((answer, index) => {
        answer.classList.remove("answers__answer--active");
        answer.firstElementChild.innerText = answers_point[index];
      });
    }, 2000);
  }
};

const handleAnswerClick = (index, elements, answers) => {
  const answers_number = document.querySelectorAll(".answers__answer-number");
  answers.forEach(
    answer => ((answer.style.backgroundColor = ""), (answer.style.color = ""))
  );
  elements.firstElementChild.innerHTML =
    '<span class="fas fa-times answers__answer-icon"></span>';

  answers.forEach(answer => answer.classList.remove("answers__answer--active"));
  elements.classList.add("answers__answer--active");

  answers.filter((answer, index) => {
    if (!answer.className.includes("answers__answer--active")) {
      answers_number[index].innerHTML = answers_point[index];
    }
  });
};
export let startGame = {
  render: async () => {
    const { userChoice } = localStorage;
    let userContent = userChoice;

    if (userContent == "games") userContent = "Video Games";
    else if (userContent == "board_game") userContent = "board games";

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
    const answers_container = [
      ...document.querySelectorAll(".answers__answer")
    ];

    answers_container.forEach((answer, index) =>
      answer.addEventListener("click", () =>
        handleAnswerClick(index, answer, answers_container)
      )
    );
    document
      .querySelector(".category__exit")
      .addEventListener("click", () => (window.location = "#"));
    const { userChoice, userLevel, userCategory } = localStorage;
    const url = `https://opentdb.com/api.php?amount=10&type=multiple&category=${userCategory}&difficulty=${userLevel.toLowerCase()}`;

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
    localStorage.setItem("correctAnswer", correct_answer);

    answers.push(correct_answer);
    const btn = document.querySelector(".select");
    btn.addEventListener("click", handleIndexChange);

    question_text.innerText = `${counter + 1}. ${question}`;

    answers_elements.forEach(
      (answer, index) => (answer.innerText = answers[index])
    );
  }
};
