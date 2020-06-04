/* eslint-disable no-use-before-define */
let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyFormContainer = document.querySelector('.container');
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = 'block';
    } else {
      toyFormContainer.style.display = 'none';
    }
  });

  const toyCollection = document.getElementById('toy-collection');
  const addNewToy = document.querySelector('.submit');
  const toyForm = document.querySelector('form');

  toyCollection.addEventListener('click', e => {
    const name = e.target.parentNode.children[0].textContent;
    const likesString = e.target.parentNode.children[3].textContent;
    const count = parseInt(likesString.split(' ')[0]);
    e.target.parentNode.children[3].textContent = `${count + 1} Likes `;

    fetch(
      `http://localhost:3000/toys/${e.target.parentNode.children[1].textContent}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          likes: count + 1,
        }),
      }
    );
  });

  addNewToy.addEventListener('click', function(e) {
    const saveToy = {
      name: toyForm.name.value,
      image: toyForm.image.value,
      likes: 0,
    };
    createToy(saveToy);
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(saveToy),
    });

    e.preventDefault();
  });

  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => {
      json.forEach(item => createToy(item));
    });

  function createToy(item) {
    const newDiv = document.createElement('div');
    newDiv.className = 'card';
    newDiv.innerHTML = `<h2>${item.name}</h2>
      <p hidden>${item.id}</p>
      <img src=${item.image} class="toy-avatar" />
      <p>${item.likes} Likes </p>
      <button class="like-btn">Like <3</button>`;
    toyCollection.append(newDiv);
  }
});
