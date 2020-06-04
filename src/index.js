let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyContainer = document.querySelector('#toy-collection')
  const submitButton = document.querySelector('.add-toy-form')
  


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function loadToys(){
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(json => renderToys(json))
  }

  function renderToys(obj){
    obj.forEach(function(obj){
      renderToy(obj)
    })
  }

  function renderToy(obj){
    const div = document.createElement('div')
    div.className = 'card'
    div.id = `${obj.id}`
    div.innerHTML = `
    <h2>${obj.name}</h2>
    <img src=${obj.image} class="toy-avatar" />
    <p id=${obj.likes}>${obj.likes} likes</p>
    <button class="like-btn">Like <3</button>
    `
    toyContainer.appendChild(div)
  }
  loadToys()

  // user to click on the create new toy
  // post request to the local api to create the new toy
  // toy should conditionally render**
  // create json-ified data to send 

  submitButton.addEventListener('submit', function(e){
    console.log("TEST")
    const toyForm = e.target
    const name = toyForm.name.value
    const image = toyForm.image.value
    const likes = 0
  
    let formData = {
      name: name,
      image: image,
      likes: likes
    }
  
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)
    };
    fetch("http://localhost:3000/toys", configObj);
  })


  //find the text content for the likes
  //add event listener to the button

  document.addEventListener('click', function(e){
    if(e.target.className === 'like-btn'){

    const parentDiv = e.target.parentNode
    const likes = parentDiv.querySelector('p')

    likes.id = parseInt(likes.id) + 1
    likes.textContent = `${likes.id} Likes`
    console.log(likes.id)

    let configObj = {
      method: "PATCH",
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        'likes': likes.id
      })
    }
    fetch(`http://localhost:3000/toys/${parentDiv.id}`, configObj)
  }
  })
});
