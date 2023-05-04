const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;

const URI = process.env.DB_CONNECTION;

const app = express();

app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/books', async (req, res) => {
  try {
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Books')
      .find()
      .toArray(); // išsitraukiame duomenis iš duomenų bazęs
    await con.close(); // uždarom prisijungimą prie duomenų bazės
    res.send(data);
  } catch (error) {
    // 500 statusas - internal server error - serveris neapdorojo arba nežino kas per klaida
    res.status(500).send(error);
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Movies')
      .findOne(new ObjectId(id));
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
// asc - didėjimo
// dsc - mažėjimo
app.get('/books/genre/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Books')
      .find({ genre: title })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/books/sortYear/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const sort = type === 'asc' ? 1 : -1;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Books')
      .find()
      .sort({ publication_year: sort })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/books', async (req, res) => {
  try {
    const book = req.body;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('Books')
      .insertOne(book);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
