let counter = 0;
let answered = true;
let correct_user_answer = 0;
const answers_point = ["a", "b", "c", "d"];
let time = 60;
let endGame = false;

const handleIndexChange = () => {
  if (!endGame) {
    // RESET TIME
    answered ? (time = 60) : null;
    const { correctAnswer } = localStorage;

    // ELEMENTS
    const answers = [...document.querySelectorAll(".answers__answer")];
    const answers__active = [
      ...document.querySelectorAll(".answers__answer-text")
    ];

    // ACTIVE ELEMENT
    const include_active = answers__active.filter(answer =>
      answer.parentElement.className.includes("answers__answer--active")
    );

    // NO ANSWER FROM USER
    if (include_active.length == 0 && answered === false) {
      answers.forEach(
        answer => (
          (answer.style.backgroundColor = "red"), (answer.style.color = "white")
        )
      );
    }

    // USER ANSWER
    else {
      let correct_answer = answers.filter(
        answer =>
          answer.firstElementChild.nextElementSibling.innerText ===
          correctAnswer
      );

      if (include_active.length !== 0) {
        let active = include_active[0].innerText;

        // USER
        if (correctAnswer === active) {
          correct_user_answer++;
          localStorage.setItem("userCorrectAnswers", correct_user_answer);
        }
      }

      // INCORRECT ANSWERS
      const inCorrect_answer = answers.filter(
        answer =>
          answer.firstElementChild.nextElementSibling.innerText !==
          correctAnswer
      );

      // INCORRECT ANSWERS--STYLE
      correct_answer[0].style.backgroundColor = "#2ECC40";
      inCorrect_answer.forEach(
        answer => (answer.style.backgroundColor = "#FF4136")
      );

      // CHECKING CORRECT ANSWERS
      setTimeout(() => {
        time = 60;
        document.querySelector(".section__info-time").innerText = `01:00 min`;

        answered = false;

        answers.forEach(answer => (answer.style.backgroundColor = ""));
        answers.forEach(answer => (answer.style.color = ""));
        ++counter;

        counter == 10 ? null : startGame.after_render();

        answers.forEach((answer, index) => {
          answer.classList.remove("answers__answer--active");
          answer.firstElementChild.innerHTML = answers_point[index];

          if (counter === 10) {
            endGame = true;

            return setTimeout(() => (window.location = "#/finish"), 1000);
          }
        });
      }, 1000);

      // REMOVE LISTENER FROM
      const btn = document.querySelector(".select");
      return btn.removeEventListener("click", handleIndexChange);
    }
  }
};

const handleAnswerClick = (elements, answers) => {
  const answers_number = document.querySelectorAll(".answers__answer-number");
  answers.forEach(
    answer => ((answer.style.backgroundColor = ""), (answer.style.color = ""))
  );
  elements.firstElementChild.innerHTML =
    '<span class="fas fa-check-circle answers__answer-icon"></span>';

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
    localStorage.setItem("userCorrectAnswers", 0);
    const { userChoice } = localStorage;
    let userContent = userChoice;

    // RESET
    time = 60;
    endGame = false;
    counter = 0;
    answered = true;
    correct_user_answer = 0;

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
      <span class="section__info-length">Quiz:<span class="section__info-counter">10</span></span>
      <span class="section__info-time">01:00 min</span>
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
    if (!endGame) {
      // ELEMENTS
      const question_text = document.querySelector(".section__question-text");
      const answers_elements = document.querySelectorAll(
        ".answers__answer-text"
      );
      const answers_container = [
        ...document.querySelectorAll(".answers__answer")
      ];

      // LISTENERS
      answers_container.forEach((answer, index) =>
        answer.addEventListener("click", () =>
          handleAnswerClick(answer, answers_container)
        )
      );
      const btn = document.querySelector(".select");
      btn.addEventListener("click", handleIndexChange);

      // API
      const { userLevel, userCategory } = localStorage;

      const url = `https://opentdb.com/api.php?amount=10&type=multiple&category=${userCategory}&difficulty=${userLevel.toLowerCase()}`;

      const response = await fetch(url, { method: "GET" });
      const data = await response.json();

      const copyData = data.results.map(result => result);

      // DATA FROM API
      const {
        category,
        question,
        type,
        correct_answer,
        incorrect_answers: answers,
        difficulty
      } = copyData[counter];
      localStorage.setItem("correctAnswer", correct_answer);

      answers.push(correct_answer);
      answers.sort();

      question_text.innerHTML = `${counter + 1}. ${question}`;

      answers_elements.forEach(
        (answer, index) => (answer.innerHTML = answers[index])
      );
      const time_counter = document.querySelector(".section__info-time");

      // TIME TO CHOOSE
      const interval = setInterval(setTime, 1000);
      if (!answered) {
        clearInterval(interval);
      }
      function setTime() {
        time < 10
          ? (time_counter.innerText = `00:0${time} min`)
          : (time_counter.innerText = `00:${time} min`);
        if (time <= 10) {
          time_counter.style.color = "red";
          time_counter.style.fontSize = "18px";
        } else {
          time_counter.style.color = "white";
          time_counter.style.fontSize = "16px";
        }

        if (time === 0) {
          answered = true;

          handleIndexChange();
        } else if (counter === 10) {
          clearInterval(interval);
        } else {
          time--;
          answered = false;
        }
      }

      // QUESTION COUNTER
      document.querySelector(".section__info-counter").innerText = `${counter +
        1}/10`;

      // EXIT
      document
        .querySelector(".category__exit")
        .addEventListener(
          "click",
          () => ((window.location = "#"), clearInterval(interval))
        );
    }
  }
};
