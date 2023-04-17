console.log("backed+frontend");
const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const names = ["Veronika"];

app.get("/", (req, res)=>{
    res.send(names); // send metodas issiuncia duomenis
});

app.post("/", (req,res)=>{
    const name = req.body.nameInput;
    names.push(name);
    res.send(req.body)
})

app.listen(port, ()=>{
    console.log("Server is listening on port")
})