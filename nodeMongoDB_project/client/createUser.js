fetch('http://localhost:3000/membership')
  .then((res) => res.json())
  .then((data) => showMembership(data))
  .catch((error) => console.log(error));

document.querySelector('#usersColor').style.cssText = 'color: #6C73D8';

function showMembership(data) {
  data.forEach((data) => {
    let newop = {
      value: `${data.name}`,
      text: `${data.name}`,
    };
    let newOption = new Option(newop.value, newop.text);
    document.querySelector('#membership').append(newOption);
  });
}

const UserForm = document.querySelector('form');

UserForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameInput = document.querySelector('#name').value;
  const surnameInput = document.querySelector('#surname').value;
  const emailInput = document.querySelector('#email').value;
  const serviseInput = document.querySelector('#membership').value;

  fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nameInput,
      surnameInput,
      emailInput,
      serviseInput,
    }),
  }).then(() => {
    fetch('http://127.0.0.1:5500/nodeMongoDB_project/UserManagement.html').then(
      () => {
        window.open('userManagement.html', '_blank');
      },
    );
  });
});

document.querySelector('.cancel').addEventListener('click', () => {
  fetch('http://127.0.0.1:5500/nodeMongoDB_project/userManagement.html').then(
    () => {
      window.open('userManagement.html', '_blank');
    },
  );
});
