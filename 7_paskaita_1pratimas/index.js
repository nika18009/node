const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

const instaPost = [];

app.get('/instaPost', (req, res) => {
  res.send(instaPost);
});

// {id, title, done}
app.post('/instaPost', (req, res) => {
  const postText = req.body;
  const newPost = { id: instaPost.length + 1, ...postText }; // pridedamas id prie siunčiamo objekto
  instaPost.push(newPost); // pridedama į masyvą
  res.send(instaPost); // išsiunčiamas response
});

app.get('/instaPost/:id', (req, res) => {
  const id = +req.params.id;
  const foundPost = instaPost.find((post) => post.id === id); // randa {...}, jei ne undefined
  if (foundPost) {
    // jeigu randa
    res.send(foundPost);
  } else {
    // jeigu neranda - 404 not found
    // res.status() - grąžina statusą
    res.status(404).send({ message: 'Post not found' });
  }
});

app.delete('/instaPost/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = instaPost.findIndex((post) => post.id === id); // randa 0-begalybės, neranda -1
  if (foundIndex !== -1) {
    // jeigu randa
    const deletingPost = instaPost.find((post) => post.id === id);
    instaPost.splice(foundIndex, 1);
    res.send(deletingPost); // grąžinam elementą kurį trinam
  } else {
    // jeigu neranda
    res.status(404).send({ message: 'Todo not found' });
  }
});

app.put('/instaPost/:id', (req, res) => {
  const id = +req.params.id;
  const foundIndex = instaPost.findIndex((post) => post.id === id);
  console.log(foundIndex);
  if (foundIndex !== -1) {
    const post = req.body; // naujai siunčiamas todo
    const updatingPost = { id, ...post }; // senas id + naujas todo
    instaPost.splice(foundIndex, 1, updatingPost); // užkeičiamas atnaujintas todo
    res.send(updatingPost);
  } else {
    res.status(404).send({ message: 'Post not found' });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
