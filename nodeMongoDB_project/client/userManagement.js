/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
fetch('http://localhost:3000/users')
  .then((res) => res.json())
  .then((data) => showUsers(data))
  .catch((error) => console.log(error));

document.querySelector('#usersColor').style.cssText = 'color: #6C73D8';
// document.querySelector('p').style.cssText = 'border-bottom:none';

function showUsers(data) {
  data.forEach((data) => {
    document.querySelector('#cardSection').append(createEle(data));
  });
}

function createEle(data) {
  const card = document.createElement('div');
  const name = document.createElement('h3');
  const email = document.createElement('p');
  const membership = document.createElement('p');
  const ip = document.createElement('p');

  card.style.cssText = 'text-align:start; padding-left: 10px';
  name.style.cssText = 'padding-bottom:1rem; color:grey';

  name.textContent = `${data.name} ${data.surname}`;
  email.textContent = `Email Adress: ${data.email}`;
  membership.textContent = `Membership: ${data.membership_info.name}`;
  ip.textContent = `ip:${data.ip}`;

  card.append(name, email, membership, ip);
  card.classList.add('newCard');

  return card;
}

document.querySelector('#addUser').addEventListener('click', () =>
  fetch('http://127.0.0.1:5500/nodeMongoDB_project/createUser.html').then(
    () => {
      window.open('createUser.html', '_blank');
    },
  ),
);

document.querySelector('.asc').addEventListener('click', () =>
  fetch('http://localhost:3000/users/asc')
    .then((res) => res.json())
    .then((data) => showFilteredusers(data))
    .catch((error) => console.log(error)),
);

document.querySelector('.dsc').addEventListener('click', () =>
  fetch('http://localhost:3000/users/dsc')
    .then((res) => res.json())
    .then((data) => showFilteredusers(data))
    .catch((error) => console.log(error)),
);

function showFilteredusers(data) {
  const removeData = document.querySelectorAll('.newCard');

  removeData.forEach((data) => {
    data.remove();
  });

  data.forEach((data) => {
    document.querySelector('#cardSection').append(createEle(data));
  });
}
