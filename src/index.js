let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyList = document.querySelector('#toy-collection')
  const baseUrl = "http://localhost:3000/toys"
  const submitButton = document.querySelector('.submit')

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  

  fetch(baseUrl)
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => renderToy(toy))
  })


  function renderToy(toy){
    const toyDiv = document.createElement('div')
    toyDiv.className = 'card'
    toyDiv.dataset.id = toy.id
    toyDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}", height="150:, width="150">
    <p>${toy.likes} likes </p>
    <button class="like-btn">Like<3</button>
    `
    toyList.appendChild(toyDiv)
  }
  
  document.addEventListener("submit", function(e){
    e.preventDefault()
    const toyForm = e.target
    const name = toyForm.name.value
    const image = toyForm.image.value
    const toyObj = {
      name: name, 
      image: image, 
      likes: 0
    }
    renderToy(toyObj)
    toyForm.name.value = ""
    toyForm.image.value = ""
    
    fetch ("http://localhost:3000/toys", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(toyObj)
    })
  })

  document.addEventListener('click', function(e){
    if(e.target.className === 'like-btn'){
      const parentDiv = e.target.parentNode
      const id = parentDiv.dataset.id
      const toyP = parentDiv.querySelector('p')
      const likes = parseInt(toyP.textContent) + 1
      console.log(likes)

      fetch(`${baseUrl}/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({likes: likes})
      })
      .then(response => response.json())
      .then(toy => {
        toyP.textContent = toy.likes + " likes"
      })
    }
    
  })
});