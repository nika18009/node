const mainForm = document.querySelector("form");

mainForm.addEventListener("submit", (event)=>{
    event.preventDefault()

    const passwordInput = document.querySelector("#pass").value;
    const emailInput = document.querySelector("#email").value;
    const nameInput = document.querySelector("#name").value;


    fetch("http://localhost:3000/", { 
        method: "POST",
        headers: { 
        "Content-Type": "application/json" 
    }, 
    body: JSON.stringify({passwordInput,emailInput,nameInput}) 
})
// .then((res)=>res.json())
.then(()=>{
    // console.log(response)
    // location.reload()
    fetch("http://127.0.0.1:5500/3_paskaita_uzduotis/index.html")
    .then((response) => {
        return response.text();
      })
      .then((html) => {
        document.body.innerHTML = html     
      });
})
})