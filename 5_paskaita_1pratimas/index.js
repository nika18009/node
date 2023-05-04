const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());


const shoppingCart = [];

app.get("/cart", (req, res) => {
    res.send(shoppingCart); 
  });

app.post("/cart", (req, res)=>{
    const newItem = req.body;
    shoppingCart.push(newItem);
    res.send(shoppingCart)
})

app.get("/cart/item/:id", (req, res) => {
    const id = req.params.id
    const foundbyID = shoppingCart.find(item => item.id === Number(id))
  if(!foundbyID){
    res.status(404).send("Item not found")
  }else{
    res.send(foundbyID);
  }
   
  });

app.listen(port, ()=>{
    console.log("Server is listening on port")
})