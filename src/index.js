let addToy = false;

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
});


function updateToy(toyObject){
  // find the object with the matching name
  currentObject = document.getElementById(`${toyObject.name}`)
  console.log(currentObject)
  // update the likes
  currentObject.innerText = `${toyObject.likes} Likes`
}


function addLikes(number, toyId){
  let data = {
    likes: number + 1,
  }
  // configobject
  let configObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  }
  // make fetch happen
  fetch(`http://localhost:3000/toys/${toyId}`, configObject)
  .then(response => response.json())
  .then(object => updateToy(object))
  .catch(error => console.log(error.message))
  
}

function addToys(array){
  const toysDiv = document.getElementById('toy-collection')
  array.forEach(toy => {
    const toyDiv = document.createElement('div')
    toyDiv.className = "card"
    toyDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p id="${toy.name}">${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>
    `
    toysDiv.append(toyDiv)
   
  })
}



document.addEventListener('DOMContentLoaded', (e) => {
  fetch("http://localhost:3000/toys/")
  .then(response => response.json())
  .then(json => addToys(json))
})

document.addEventListener('DOMContentLoaded', (e)=>{
  let button = document.querySelector("body > div.container > form > input.submit")
  button.addEventListener('click', function(e){
    // save input to variables
    let toyName = document.querySelector("body > div.container > form > input:nth-child(2)").value
    let toyImage = document.querySelector("body > div.container > form > input:nth-child(4)").value
    newToy = {
      name: toyName,
      image: toyImage,
    }
    // configobject
    let configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
    }
    // make fetch happen
    fetch('http://localhost:3000/toys/', configObject)
    .then(response => response.json())
    .then(object => console.log(object))
    .catch(error => console.log(error.message))
  })
})

const buttons = document.getElementsByClassName("button")
console.dir(buttons)
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(e.target)
  })
})
