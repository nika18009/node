const express = require("express"); // express modulio importavimas
const app = express(); // aplikacijos sukurimas
const port = 3000; // porto (kanalo) skaicius

// route'as (kelias), get - grazink duomenis
app.get("/", (req, res)=>{
    res.send("Veronika"); // send metodas issiuncia duomenis
})

app.get("/today", (req,res)=>{
    res.send(new Date().toDateString())
})

app.get("/user", (req,res)=>{
    const user = {
        name: "Veronika", 
        city: "London", 
    }
    res.send(user)
})
// serverio paleidimas
app.listen(port, ()=>{
    console.log(`Server is listening on port on port ${port}`)
})