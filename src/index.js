//with response data make a div
//then loop all data
//then add each individual json object into div class = card
//div class card needs to go into toy collection div

document.addEventListener("DOMContentLoaded", () => {
let addToy = false;
const toyCollection = document.querySelector("#toy-collection")
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");

function getToys() {
  return fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => renderToys(toys))

}

function renderToys(toys) {
  toys.forEach(toy => {
    renderToy(toy)
  });  
}

function renderToy(toy) {
    const newDiv = document.createElement('div')
    const h2 = document.createElement('h2')
    const img = document.createElement('img')
    const p = document.createElement('p')
    const button = document.createElement('button')
    
    newDiv.setAttribute('class', "card")
    h2.innerText = toy.name

    img.setAttribute('class', "toy-avatar")
    img.src = toy.image

    p.innerText = toy.likes + ' Likes'

    button.setAttribute("class", "like-btn")
    button.innerText = "Like"

    newDiv.append(h2,img,p, button)
    toyCollection.append(newDiv)
  
}




  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", event => {
        event.preventDefault()
        updateToys(event.target)
      })

    } else {
      toyFormContainer.style.display = "none";
    }


  });


  function updateToys(toyObj) {
    fetch(('http://localhost:3000/toys'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toyObj.name.value,
        "image": toyObj.image.value,
        "likes": 0
      })
    })
    .then(res => res.json())
    .then(newToy => renderToy(newToy))


  }

  getToys()
});
