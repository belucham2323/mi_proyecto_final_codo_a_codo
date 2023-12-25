
const express = require("express");

const productController = require("../controllers/productsControllers.js");

const upload = require("../middlewares/upload.js");

const Session = require("../middlewares/Session.js");

const router = express.Router();

// Valido Sesion del Usuario:
router.use( Session.isLog );

/* Proceso ruta-controlador: */

// listado de productos
router.get('/', productController.admin );

// form: agregar nuevo producto
router.get('/create', productController.create );

// proceso: agrego producto y subo archivos
router.post('/create', upload.array( 'imagenes', 2 ), productController.createProcess );

// form : modificar producto
router.get('/:id', productController.edit );

// modifico producto y sobrescribo arhivos
router.put('/:id', upload.array( 'imagenes', 2 ), productController.editProcess );


module.exports = router;
