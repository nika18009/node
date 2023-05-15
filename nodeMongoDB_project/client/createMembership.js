const membershipForm = document.querySelector('form');
document.querySelector('#membershipColor').style.cssText = 'color: #6C73D8';

membershipForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nameInput = document.querySelector('#name').value;
  const priceInput = +document.querySelector('#price').value;
  const descriptionInput = document.querySelector('#description').value.trim();

  fetch('http://localhost:3000/membership')
    .then((res) => res.json())
    .then((data) => {
      if (data.some((data) => data.name === nameInput)) {
        alert(`${nameInput} Membership is already created`);
      } else {
        fetch('http://localhost:3000/membership', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nameInput,
            priceInput,
            descriptionInput,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            fetch(
              'http://127.0.0.1:5500/nodeMongoDB_project/membership.html',
            ).then(() => {
              window.open('membership.html', '_blank');
            });
          });
      }
    })
    .catch((error) => console.log(error));
});

document.querySelector('.cancel').addEventListener('click', () => {
  fetch('http://127.0.0.1:5500/nodeMongoDB_project/membership.html').then(
    () => {
      window.open('membership.html', '_blank');
    },
  );
});
