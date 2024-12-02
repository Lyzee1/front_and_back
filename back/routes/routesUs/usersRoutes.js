const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "marvel",
});

router.post("/register", async (req, res) => {
  const { usuario, password } = req.body;
  try {
    const [[existingUser]] = await pool.execute(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario]
    );

    if (existingUser) {
      return res.status(400).send("El usuario ya existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      "INSERT INTO usuarios (usuario, password) VALUES (?, ?)",
      [usuario, hashedPassword]
    );

    res.status(201).send("Usuario registrado con éxito");
  } catch (err) {
    console.error("Error al registrar el usuario: ", err);
    res.status(500).send("Error del servidor");
  }
});

router.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const [[user]] = await pool.execute(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario]
    );

    if (!user) {
      return res.status(401).send("Usuario no encontrado");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Contraseña incorrecta");
    }

    req.session.user = user.usuario;
    res.send(`Usuario ${user.usuario} ha iniciado sesión.`);
  } catch (err) {
    console.error("Error al iniciar sesión: ", err);
    res.status(500).send("Error del servidor");
  }
});

router.get("/logout", (req, res) => {
  if (!req.session) {
    return res.status(400).send("No hay sesión activa para cerrar.");
  }

  req.session.destroy((err) => {
    if (err) {
      console.error("Error al destruir la sesión:", err);
      return res.status(500).send("Error al cerrar sesión");
    }

    res.clearCookie("connect.sid");
    res.status(200).send("Sesión cerrada correctamente.");
  });
});

module.exports = router;
