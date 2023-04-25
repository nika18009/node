const express = require("express");
const cors = require("cors");
const port = 3000;
const data = require("./data")
const app = express();
app.use(express.json());
app.use(cors());


// abi eilutės daro tą patį
// console.log(cars.bmw);
// console.log(cars["bmw"]);

// dinaminis linkas, tas kuris prasideda su : (dvitaškiu)
app.get("/", (req, res) => {
  res.send(data); // dinamiškai ištraukti duomenys
});

//2.
app.get("/cars/:model", (req, res) => {

    const model = req.params.model
    const filteredClients = data.filter(
        (client) => client.car.toLowerCase() === model.toLowerCase())

    res.send(filteredClients); // dinamiškai ištraukti duomenys
  });


  //3
  app.get("/clients/:id", (req, res) => {

    const id = req.params.id
    const foundClient = data.find(client => client.id === Number(id))

    res.send(foundClient); // dinamiškai ištraukti duomenys
  });

  //4

  app.get("/emails", (req, res) => {

    const emails = data.map((client) => client.email)
    res.send(emails); // dinamiškai ištraukti duomenys
  });

  //5

  app.get("/femals", (req, res) => {

    const filteredFemales = data.filter((client) => client.gender === "Female")
     
    const femalesFullName = data.map(
        female => `${female.first_name} ${female.last_name}`
    )
    res.send(femalesFullName);
  });

app.listen(port, () => console.log(`Server started on port ${port}...`));