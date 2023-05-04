const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

const users = []

app.get("/users", (req, res)=>{
    res.send(users); 
});

app.post("/users", (req,res)=>{
    const newUser = {
        id: `${req.body.idInput}`,
        password: `${req.body.passwordInput}`,
        email: `${req.body.emailInput}`,
        age: `${req.body.ageInput}`,
        about: `${req.body.aboutInput}`
    }
    users.push(newUser);
    res.send(req.body)
})

app.listen(port, ()=>{
    console.log("Server is listening on port")
})