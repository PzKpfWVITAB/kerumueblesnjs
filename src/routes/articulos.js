const express = require('express');
const router = express.Router();

const articulosController = require('../controllers/articulosController');

router.get('/artsview', articulosController.list); // ver articulos con get
router.get('/artdelete/:id', articulosController.delete); // eliminar articulos con get
router.post('/artsave', articulosController.save); // guardar articulos con post
router.post('/artedit/:id', articulosController.update);  // Ruta para actualizar un artegoria

module.exports = router;