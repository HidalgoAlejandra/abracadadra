const express = require("express");
const app = express();
const PORT = 3000;
//npm init --yes
//npm install express
//node index

const usuarios = [
  "Juan",
  "Jocelyn",
  "Astrid",
  "Maria",
  "Ignacia",
  "Javier",
  "Brian",
];

//carpeta publica
app.use(express.static("assets"));
//definimos index.html en la ruta raiz
//http://localhost:3000/
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//http://127.0.0.1:3000/abracadabra/usuarios
app.get("/abracadabra/usuarios", (req, res) => {
  // Verificar si existen usuarios
  if (usuarios.length > 0) {
    res.status(200).send({ usuarios });
  } else {
    res.status(404).send("No se encontraron usuarios.");
  }
});
//Creacion Middleware
//http://127.0.0.1:3000/abracadabra/juego/Maria
app.get("/abracadabra/juego/:usuario", (req, res, next) => {
  usuarios.includes(req.params.usuario) ? next() : res.redirect("/who.jpeg");
});
app.get("/abracadabra/juego/:usuario", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/abracadabra/conejo/:n", (req, res) => {
  // Aleatorio
  const aleatorio = Math.floor(Math.random() * (4 - 1)) + 1;
  // Recibido como parametro
  const n = req.params.n;
  // Comparo
  aleatorio == n
    ? res.redirect("/conejito.jpg")
    : res.redirect("/voldemort.jpg");
});

//iniciar servidor
app.listen(PORT, () => {
  console.log(`servidor express escuchando en el puerto ${PORT}`);
});
//Mensaje en caso de que pagina no esté definida
app.get("*", (req, res) => {
  res.send("Esta pagina no existe  ");
});
