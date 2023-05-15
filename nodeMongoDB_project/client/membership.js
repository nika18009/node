fetch('http://localhost:3000/membership')
  .then((res) => res.json())
  .then((data) => showMemberships(data))
  .catch((error) => console.log(error));

document.querySelector('#membershipColor').style.cssText = 'color: #6C73D8';

function showMemberships(data) {
  data.forEach((data) => {
    document.querySelector('#cardSection').append(createEle(data));
  });
}

function createEle(data) {
  const card = document.createElement('div');
  const price = document.createElement('h4');
  const description = document.createElement('p');
  const deleteButton = document.createElement('button');
  const fetchLink = `http://localhost:3000/membership/${data.name}`;

  description.style.cssText =
    'border-bottom: solid gainsboro 0.1px;padding-bottom: 1.3rem; margin-top: 5px;';
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.style.cssText =
    'background-color: white; border: solid white 1px; font-size: 1.1rem; color: rgba(192, 30, 30, 0.836)';

  price.textContent = `$ ${data.price} ${data.name}`;
  description.textContent = `${data.description}`;

  card.append(price, description, deleteButton);
  card.classList.add('newCard');
  deleteButton.classList.add('deleteMembership');

  deleteButton.addEventListener('click', () => {
    card.remove();
    fetch(fetchLink, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
  });

  return card;
}

document.querySelector('#add').addEventListener('click', () =>
  fetch('http://127.0.0.1:5500/nodeMongoDB_project/createMembership.html').then(
    () => {
      window.open('createMembership.html', '_blank');
    },
  ),
);
