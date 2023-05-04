const express = require("express");
const cors = require("cors");
const port = 3000;
const data = require("./data");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(data);
});

//2.
app.get("/items/:category", (req, res) => {
  const itemType = req.params.category;
  const filteredItems = data.filter(
    (item) =>
      item.category.toLowerCase().split(" ").join("") ===
      itemType.toLowerCase().split(" ").join("")
  );

  res.send(filteredItems);
});

//3
app.get("/item/:id", (req, res) => {
  const id = req.params.id;
  const foundbyID = data.find((item) => item.id === Number(id));

  res.send(foundbyID); // dinamiškai ištraukti duomenys
});

//4

app.get("/allItems", (req, res) => {
  const allItems = [];
  data.forEach((item) => {
    allItems.push(item.name);
  });

  res.send(allItems); // dinamiškai ištraukti duomenys
});

app.get("/itemsStock/:number", (req, res) => {
  const stockNumber = req.params.number;

  const filteredItems = data.filter((item) => item.stock < Number(stockNumber));

  filteredItems.forEach((item) => {
    delete item.id;
    delete item.category;
    delete item.price;
  });

  res.send(filteredItems); // dinamiškai ištraukti duomenys
});

app.get("/itemsStock/:minPrice/:maxPrice", (req, res) => {
  const minPrise = Number(req.params.minPrice);
  const maxPrise = Number(req.params.maxPrice);
  const filteredItems = data.filter(
    (item) => item.price >= minPrise && item.price <= maxPrise
  );
  res.send(filteredItems);
});

app.post("/", (req, res) => {
  const newItem = req.body;

  const isIdExists = data.some((item) => item.id === newItem.id);

  if (isIdExists) {
    res.send(`Product with id:${newItem.id} already exists`);
  } else {
    data.push(newItem);
    res.send(data);
  }
});

app.delete("/:id", (req, res) => {
  const index = data.find((item) => item.id === req.params.id);

  if (index === -1) {
    res.status(404).send("Item not found");
  } else {
    data.splice(index, 1);
    res.send("Item removed");
  }
});
app.listen(port, () => console.log(`Server started on port ${port}...`));
