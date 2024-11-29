const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());

const puerto = 3000;

app.get("/cats", (req, res) => {
  const filePath = path.join(__dirname, "data/cats/cat.json");
  res.sendFile(filePath);
});

app.get("/products/:id", (req, res) => {
  const filePath = path.join(__dirname, `data/products/${req.params.id}.json`);
  res.sendFile(filePath);
});


app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
