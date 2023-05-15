const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;

const URI = process.env.DB_CONNECTION;

const app = express();

app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/categories', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('categories')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/products', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('products')
      .aggregate([
        {
          $lookup: {
            from: 'categories', // kita kolekcija, su kuria jungiamasi
            localField: 'categoryId', // laukas iš pets kolekcijos
            foreignField: '_id', // laukas iš owners kolekcijos
            as: 'category_info', // išeigos masyvo laukas
          },
        },
        {
          $unwind: '$category_info', // išplečia masyvą, kad kiekvienas elementas būtų atskiras dokumentas
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/categoryvalue', async (req, res) => {
  // total amount of money spent by each customer - kiek kiekvienas asmuo išleido pinigų
  try {
    const con = await client.connect();
    const data = await con
      .db('ManoDuomenuBaze')
      .collection('products')
      .aggregate([
        {
          $lookup: {
            from: 'categories', // kita kolekcija, su kuria jungiamasi
            localField: 'categoryId', // laukas iš pets kolekcijos
            foreignField: '_id', // laukas iš owners kolekcijos
            as: 'category_info', // išeigos masyvo laukas
          },
        },
        {
          $unwind: '$category_info', // išplečia masyvą, kad kiekvienas elementas būtų atskiras dokumentas
        },
        { $group: { _id: '$category_info', totalAmount: { $sum: '$price' } } },
        { $sort: { totalAmount: -1 } },
      ])
      .toArray();
    // $group - sugrupuoja, _id: $customer - naudoja unikalų customerį,
    // totalAmount: { $sum: '$total' } - totalAmount raktas su suma kurią sudeda iš $total lauko
    // $sort: { totalAmount: -1 } - sortina mažėjimo tvarka pagal tam tikrą kriterijų: totalAmount
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
