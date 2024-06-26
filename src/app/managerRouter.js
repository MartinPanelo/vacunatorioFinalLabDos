const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();


/* const home = require("./routes/Home");
const cuenta = require("./routes/RouterCuenta");
router.use("/", home);
router.use("/", cuenta); */


// Obtener las rutas de la carpeta "routes"
const rutasPath = path.join(__dirname, "./routes/");

// Leer los archivos de la carpeta "routes"
fs.readdirSync(rutasPath).forEach((file) => {
  // Obtener la ruta completa del archivo
  const filePath = path.join(rutasPath, file);

  // Importar el archivo de la ruta
  const ruta = require(filePath);

  // Agregar los endpoints al enrutador

  router.use("/", ruta);
  console.log("ruta leida", filePath);
});

router.use((req, res, next) => {
  res.status(404).redirect("/home");
  //res.status(404).render("error", { error: "404", mensaje: "Página no encontrada" });
});
router.use((req, res, next) => { // erorr de servidor
  res.status(500).render("error" , { error: "500", mensaje: "Error interno del servidor" });
});
// Exportar el enrutador
module.exports = router;
