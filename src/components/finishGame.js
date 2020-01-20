export let Finish = {
  render: async () => {
    let view = /*html*/ `
              
                  <h1 style="color: white;font-size:50px;"> Koniecc gryyy</h1>
                
          `;
    return view;
  },
  after_render: async () => {
    const { userCorrectAnswers } = localStorage;
    document.querySelector("h1").innerText = userCorrectAnswers;
  }
};
