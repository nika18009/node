const mainForm = document.querySelector("form");

mainForm.addEventListener("submit", (event)=>{
    event.preventDefault()

    const passwordInput = document.querySelector("#pass").value;
    const passwordReapeatinput = document.querySelector("#passRepeat").value;
    if (passwordInput === passwordReapeatinput){
      const emailInput = document.querySelector("#email").value;
    const nameInput = document.querySelector("#name").value;


    fetch("http://localhost:3000/users", { 
        method: "POST",
        headers: { 
        "Content-Type": "application/json" 
    }, 
    body: JSON.stringify({passwordInput,emailInput,nameInput}) 
})
.then(()=>{
    // location.reload()
    fetch("http://127.0.0.1:5500/3_paskaita_uzduotis/index.html")
    .then(() => {
         window.open("index.html", "_blank");
      })
      
})  
} else{
    alert("Slaptažodžiai nesutampa")
} 
})