export let startGame = {
  render: async () => {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=10&type=multiple",
      { method: "GET" }
    );
    const data = await response.json();
    console.log(data);

    const { userChoice, userLevel } = localStorage;
    console.log(userChoice, userLevel);
    let view = /*html*/ `
      <h1>Elooo</h1>  
      `;
    return view;
  },
  after_render: async () => {}
};
