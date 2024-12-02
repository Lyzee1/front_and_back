const express = require("express");
const path = require("path");
const router = express.Router(); 

// Ruta para manejar errores 404
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../public/404.html"));
});

// -------------------------- EXPORTAR RUTAS -------------------------- //
module.exports = router;
