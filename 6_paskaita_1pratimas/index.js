const express = require('express');
const cors = require('cors');
require('dotenv').config(); // reikalinga, kad tik uzkrautu failus
// provess.env - objektas sukurtas is .env failo8080 - griztamasis rysys, jeigu PORT bus nerastas
const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

const allTickets = [];

app.get('/tickets', (req, res) => {
  res.send(allTickets);
});

app.post('/tickets', (req, res) => {
  const newTicket = req.body;
  newTicket.id = allTickets.length + 1;
  allTickets.push(newTicket);
  res.send(allTickets);
});

app.get('/tickets/item/:id', (req, res) => {
  const foundbyID = allTickets.find((item) => item.id === Number(req.params.id));
  if (!foundbyID) {
    res.status(404).send('Item not found');
  } else {
    res.send(foundbyID);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
