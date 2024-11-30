const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "CLAVE ULTRA SECRETA";
const app = express();
const puerto = 3000;

app.use(express.json());
app.use(cors());

// Pauta 2

app.get("/cats", (req, res) => {
  const filePath = path.join(__dirname, "data/cats/cat.json");
  res.sendFile(filePath);
});

app.get("/cart", (req, res) => {
  const filePath = path.join(__dirname, "data/cart/buy.json");
  res.sendFile(filePath);
});

app.get("/products/:id", (req, res) => {
  const filePath = path.join(__dirname, `data/products/${req.params.id}.json`);
  res.sendFile(filePath);
});

app.get("/cats_products/:id", (req, res) => {
  const filePath = path.join(__dirname, `data/cats_products/${req.params.id}.json`);
  res.sendFile(filePath);
});

app.get("/products_comments/:id", (req, res) => {
  const filePath = path.join(__dirname, `data/products_comments/${req.params.id}.json`);
  res.sendFile(filePath);
});

app.get("/sell", (req, res) => {
  const filePath = path.join(__dirname, "data/sell/publish.json");
  res.sendFile(filePath);
});

app.get("/user_cart", (req, res) => {
  const filePath = path.join(__dirname, "data/user_cart/25801.json");
  res.sendFile(filePath);
});

// Pauta 3 

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
  }
});


// Pauta 4

app.use("/people", (req, res, next) => {
  try {
    const token = req.headers["access-token"];
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Token válido para usuario:", decoded.username);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});


app.get("/people", (req, res) => {
  const filePath = path.join(__dirname, "data/people/people.json");


 
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).json({ message: "Archivo no encontrado" });
    }
    res.status(200).json(JSON.parse(data));
  });
});


app.get("/products/:id", (req, res) => {
  const filePath = path.join(__dirname, `data/products/${req.params.id}.json`);
  res.sendFile(filePath);
});


app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
