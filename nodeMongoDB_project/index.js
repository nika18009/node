const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION;
const dbName = process.env.DB_NAME;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/membership', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('services').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('users')
      .aggregate([
        {
          $lookup: {
            from: 'services',
            localField: 'service_name',
            foreignField: 'name',
            as: 'membership_info',
          },
        },
        {
          $unwind: '$membership_info',
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/:order', async (req, res) => {
  try {
    const { order } = req.params;
    const sort = order === 'asc' ? 1 : -1;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('users')
      .aggregate([
        {
          $lookup: {
            from: 'services',
            localField: 'service_name',
            foreignField: 'name',
            as: 'membership_info',
          },
        },
        {
          $unwind: '$membership_info',
        },
      ])
      .sort({
        name: sort,
      })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/membership', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('services')
      .insertMany([
        {
          name: `${req.body.nameInput}`,
          price: `${req.body.priceInput}`,
          description: `${req.body.descriptionInput}`,
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
    const ipNumber = `${Math.floor(Math.random() * 255)
      + 1
    }.${
      Math.floor(Math.random() * 255)
    }.${
      Math.floor(Math.random() * 255)
    }.${
      Math.floor(Math.random() * 255)}`;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('users')
      .insertMany([
        {
          name: `${req.body.nameInput}`,
          surname: `${req.body.surnameInput}`,
          email: `${req.body.emailInput}`,
          ip: ipNumber,
          service_name: `${req.body.serviseInput}`,
        },
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/membership/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('services')
      .deleteOne({ name: id });
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
