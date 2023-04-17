const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

const cars = [];

app.get("/cars", (req, res)=>{
    
    res.send(cars); 
});

app.post("/cars", (req,res)=>{
    const newCar = "Mercedes";
    cars.push(newCar);
    res.send(cars)
})


app.listen(port, ()=>{
    console.log("Server is listening on port")
})