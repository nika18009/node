const express = require('express');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

const users = []

app.get("/", (req, res)=>{
    res.send(users); 
});

app.post("/", (req,res)=>{
    const newUser = {
        password: `${req.body.passwordInput}`,
        email: `${req.body.emailInput}`,
        name: `${req.body.nameInput}`
    }
    users.push(newUser);
    res.send(req.body)
})


app.listen(port, ()=>{
    console.log("Server is listening on port")
})