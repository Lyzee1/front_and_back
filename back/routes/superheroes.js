const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "marvel",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Conectado a MySQL");
});

// Obtener todos los personajes (SELECT)
router.get("/", (req, res) => {
  let sql = "SELECT * FROM superheroes";
  conn.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Insertar un nuevo superhéroe (CREATE)
router.post("/save", (req, res) => {
  let data = {
    alias: req.body.alias,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: req.body.edad,
    ciudad: req.body.ciudad,
    poderes: req.body.poderes,
  };
  let sql = "INSERT INTO superheroes SET ?";
  conn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.status(201).send();
  });
});

// Actualizar un superhéroe (UPDATE)
router.put("/:id", (req, res) => {
  let sql = "SELECT * FROM superheroes WHERE id = ?";
  conn.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    if (result.length <= 0) {
      res.status(404).send();
    }
  });
  let data = {
    alias: req.body.alias,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: req.body.edad,
    ciudad: req.body.ciudad,
    poderes: req.body.poderes,
  };

  let sqlUpdate = "UPDATE superheroes SET ? WHERE id = ?";
  conn.query(sqlUpdate, [data, req.params.id], (err, results) => {
    if (err) throw err;
    res.status(200).send();
  });
});

// Eliminar un superhéroe (DELETE)
router.delete("/:id", (req, res) => {
  let sql = "DELETE FROM superheroes WHERE id = ?";
  conn.query(sql, [req.params.id], (err, results) => {
    if (err) throw err;
    res.status(204).send();
  });
});

module.exports = router;
