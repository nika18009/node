const mainForm = document.querySelector("form");

mainForm.addEventListener("submit", (event)=>{
    event.preventDefault()

    const passwordInput = document.querySelector("#pass").value;
    const emailInput = document.querySelector("#email").value;


    fetch("http://localhost:3000/login", { 
        method: "POST",
        headers: { 
        "Content-Type": "application/json" 
    }, 
    body: JSON.stringify({passwordInput,emailInput}) 
}).then((res)=>res.json())
    .then(data =>  showMessage(data))
  .catch(error => console.log(error))

})

function showMessage(data){
    console.log(data.message)
    const message = document.createElement("h3");
    if (data.message == "Sveiki prisijungę"){
        document.querySelector("p").style.cssText = "display: none";
        mainForm.reset();
        setTimeout(function () {
            alert(`${data.message}`)
        }, 500);
    } else{
        message.textContent = `${data.message}`;
    message.style.cssText = "color:red"
   document.querySelector("p").append(message)
    }  
}