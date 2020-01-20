export const handleSelectClick = (divs, index) => {
  divs.forEach(div => div.classList.remove("section__level--active"));
  divs[index].classList.add("section__level--active");

  //VALIDATION
  divs.forEach(div => (div.style.backgroundColor = ""));
};

export const handleBtnLevelClick = divs => {
  const checking = divs.filter(div =>
    div.className.includes("section__level--active")
  );

  if (checking.length === 0) {
    divs.forEach(div => (div.style.backgroundColor = "red"));
  } else {
    localStorage.setItem("userLevel", checking[0].innerText);
    localStorage.setItem("userCorrectAnswers", 0);
    window.location.href = "#/startGame";
  }
};
