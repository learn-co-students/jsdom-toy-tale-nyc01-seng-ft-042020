let addToy = false;

function createToyDiv(data){
  //create a div 
//grab existing 'toy-collection node'
let toyCollectionDiv = document.querySelector("#toy-collection");
//iterate through the array of toy objects, creating a div for each one.
//set the innerHTML of the div's to have the information stored in the toyObject.
data.forEach(toyObj => {
  let toyDiv = document.createElement('div');
  toyDiv.className = 'card';
  toyDiv.innerHTML = `
  <h2>${toyObj.name}</h2>
  <img class="toy-avatar" src=${toyObj.image}>
  <p>${toyObj.likes}</p>
  <button class="like-btn">Like <3</button>
  `;
  toyCollectionDiv.append(toyDiv);
});

}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  //fetch toy objects

  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(json => createToyDiv(json));
  
  //create a div with class 'card' for each toy
  //append that div to the 'toy-collection' div

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function createToyFromForm(toyForm){
    let toyCollectionDiv = document.querySelector("#toy-collection");
    
    let toyDiv = document.createElement('div');
    toyDiv.className = 'card';
    toyDiv.innerHTML = `
    <h2>${toyForm.name}</h2>
    <img class="toy-avatar" src=${toyForm.image}>
    <p>${toyForm.likes}</p>
    <button class="like-btn">Like <3</button>
    `;
    toyCollectionDiv.append(toyDiv);
  
    }

  let createBtn = document.querySelector('.submit');

  createBtn.addEventListener('click', (e)=> {
    e.preventDefault();
  let name =  document.querySelector("body > div.container > form > input:nth-child(2)").value;
  let image = document.querySelector("body > div.container > form > input:nth-child(4)").value;
  let toyForm = {name: name, image: image, likes:0};
  createToyFromForm(toyForm);
  } );

  
  let toyCollectionDiv = document.querySelector("#toy-collection");

  toyCollectionDiv.addEventListener('click', (e) => {
    console.log("this is parent node children", e.target.parentNode.children);
  });
 
 

});

