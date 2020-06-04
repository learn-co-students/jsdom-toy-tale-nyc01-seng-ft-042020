let addToy = false;

const toyCollection = document.querySelector("toy-collection")
console.log(toyCollection)

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  let data = fetch('http://localhost:3000/toys')
        .then( res => res.json() )
        .then( json => information(json) )
  function information(toyInfo){
    const toyList = document.createElement('div')
    toyCollection.appendChild(toyList)
  }

});
