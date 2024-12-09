const express = require('express');
const router = express.Router();

const categoriasController = require('../controllers/categoriasController');

router.get('/catsview', categoriasController.list); // ver categorias con get
router.get('/catdelete/:id', categoriasController.delete); // eliminar categorias con get
router.post('/catsave', categoriasController.save); // guardar categorias con post
router.post('/catedit/:id', categoriasController.update);  // Ruta para actualizar un categoria

module.exports = router;