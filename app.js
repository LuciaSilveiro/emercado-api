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

// Ruta para devolver los datos de gatos
app.get("/cats", (req, res) => {
  const filePath = path.join(__dirname, "data/cats/cat.json");
  res.sendFile(filePath);
});

// Ruta de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
  }
});

// Middleware para proteger las rutas de /people
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

// Ruta para devolver los datos de personas
app.get("/people", (req, res) => {
  const filePath = path.join(__dirname, "data/people/people.json");

  // Verifica si el archivo existe antes de enviarlo
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).json({ message: "Archivo no encontrado" });
    }
    res.status(200).json(JSON.parse(data));
  });
});

// Ruta para devolver productos específicos
app.get("/products/:id", (req, res) => {
  const filePath = path.join(__dirname, `data/products/${req.params.id}.json`);
  res.sendFile(filePath);
});

// Iniciar servidor
app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});
