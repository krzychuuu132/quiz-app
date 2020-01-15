export let Error404 = {
  render: async () => {
    let view = /*html*/ `
        <h1>Something went wrong :(</h1>  
        `;
    return view;
  },
  after_render: async () => {
    //console.log(localStorage);
  }
};
