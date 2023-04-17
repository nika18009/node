fetch("http://localhost:3000/")
    .then((res)=>res.json())
    .then((response)=>{
       const namesList = document.querySelector("#names");

        response.forEach(name => {
        const li = document.createElement("li");
        li.textContent= name;
        namesList.append(li)
       });
    })


console.log("hello from index file")

const nameButton = document.querySelector("#addName");

nameButton.addEventListener("click", ()=>{
    const nameInput = document.querySelector("input").value;
    console.log(nameInput);
    

    fetch("http://localhost:3000/", { 
        method: "POST",
        headers: { 
        "Content-Type": "application/json" 
    }, 
    body: JSON.stringify({nameInput}) 
}).then(()=>{
    location.reload()
})
})