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

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users11')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/comments', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('comments')
      .aggregate([
        {
          $lookup: {
            from: 'users', // kita kolekcija, su kuria jungiamasi
            localField: 'userId', // laukas iš pets kolekcijos
            foreignField: '_id', // laukas iš owners kolekcijos
            as: 'user_info', // išeigos masyvo laukas
          },
        },
        {
          $unwind: '$user_info', // išplečia masyvą, kad kiekvienas elementas būtų atskiras dokumentas
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('comments')
      .insertMany([
        {
          date: new Date(),
          comment: 'Wyd',
          userId: new ObjectId(id),
        },
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('users11')
      .insertMany([
        {
          name: 'Alice',
          surname: "Smith",
          email: 'alice.smith@example.com',
          city: "Vilnius",
          income: 5500
        },
        {
          name: 'Bob',
          surname: "Johnson",
          email: 'bob.johnson@example.com',
          city: "Vilnius",
          income: 500
        },
        {
          name: 'Charlie',
          surname: "Brown",
          email: 'charlie.brown@example.com',
          city: "Vilnius",
          income: 4000
        },
        {
          name: 'David',
          surname: "Lee",
          email: 'david.lee@example.com',
          city: "Vilnius",
          income: 2200
        },
        
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('comments')
      .deleteOne({ _id: new ObjectId(id) }); // ištrina vieną
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on the ${port}`);
});
