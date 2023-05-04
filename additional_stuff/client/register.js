const mainForm = document.querySelector("form");

// document.querySelector(".readOnly").append(Math.floor(Math.random() * 100 + 1));

mainForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const passwordInput = document.querySelector("#pass").value;
  const passwordReapeatinput = document.querySelector("#rpass").value;
  if (passwordInput === passwordReapeatinput) {
    const emailInput = document.querySelector("#email").value;
    const ageInput = +document.querySelector("#age").value;
    const aboutInput = document.querySelector("#about").value;
    const idInput = document.querySelector("#name").value;

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        passwordInput,
        emailInput,
        ageInput,
        aboutInput,
        idInput,
      }),
    }).then(() => {
      // location.reload()
      fetch("http://127.0.0.1:5500/additional_stuff/login.html").then(() => {
        window.open("login.html", "_blank");
      });
    });
  } else {
    alert("Paswords do not match!");
  }
});
