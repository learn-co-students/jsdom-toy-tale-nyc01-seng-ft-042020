let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  const likeButton = 
  

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  document.addEventListener("submit", function(e){
    e.preventDefault()
    const toyForm = e.target
    renderToy(toyForm)
    toyForm.name.value = ""
    toyForm.image.value = ""
    
    return fetch ("http://localhost:3000/toys", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      
      body: JSON.stringify({
        "name": toyForm.name.value,
        "image": toyForm.image.value,
        "likes": 0
      })
    })
    
  });

  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(json => information(json))
  
  function information(toyInfo){
    toyInfo.forEach(function(toyObj){
      createToy(toyObj)
    })
  }

  function createToy(toyObj){
    const toyDiv = document.createElement('div')
    toyDiv.className = 'card'
    toyDiv.id = toyObj.id
    toyDiv.innerHTML = `
    <h2>${toyObj.name}</h2>
    <img src="${toyObj.image}" height="142" width="142">
    <p> ${toyObj.likes} likes </p>
    <button class="like-btn">Like <3</button>
    `
    toyCollection.appendChild(toyDiv)
  }

  function renderToy(toyObj){
    const toyDiv = document.createElement('div')
    toyDiv.className = 'card'
    toyDiv.id = toyObj.id
    toyDiv.innerHTML = `
    <h2>${toyObj.name.value}</h2>
    <img src="${toyObj.image.value}" height="142" width="142">
    <p> 0 likes </p>
    <button class="like-btn">Like <3</button>
    `
    toyCollection.appendChild(toyDiv)
  }

  document.addEventListener('click', function(e){
    if(e.target.className === 'like-btn'){
      const parentDiv = e.target.parentNode
      const toyP = parentDiv.querySelector('p')
      const likes = parseInt(toyP.textContent) + 1
      console.log(toyP)
      console.log(likes)
    //   return fetch ("http://localhost:3000/toys", {
    //     method: "PATCH",
    //     headers:{
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //     },

    //     body: JSON.stringify({
    //       "likes": toyP.textContent
    //     })
    //   })
    //   .then(response => response.json())
    //   .then(toy => {
    //       toyP.textContent = toy.likes + "likes"
    //   })

    }
  });

});