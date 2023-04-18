fetch("http://localhost:3000/products")
    .then((res)=>res.json())
    .then((response)=>{
       const productList = document.querySelector("#products");
        response.forEach(name => {
        const li = document.createElement("li");
        li.textContent= `product: ${name.name} price: ${name.price}eu`;
        productList.append(li)
       });
    })



const productButton = document.querySelector("#addProduct");

productButton.addEventListener("click", ()=>{
    const productnameInput = document.querySelector("#productName").value;
    const productpriceInput = document.querySelector("#productPrice").value;
    

    fetch("http://localhost:3000/products", { 
        method: "POST",
        headers: { 
        "Content-Type": "application/json" 
    }, 
    body: JSON.stringify({productnameInput,productpriceInput}) 
})
// .then((res)=>res.json())
.then(()=>{
    // console.log(response)
    location.reload()
})
})