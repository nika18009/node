const express = require('express');
const cors = require('cors');
require('dotenv').config(); // reikalinga, kad tik uzkrautu failus
// provess.env - objektas sukurtas is .env failo8080 - griztamasis rysys, jeigu PORT bus nerastas
const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
