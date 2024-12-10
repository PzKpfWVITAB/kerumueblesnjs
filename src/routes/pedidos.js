const express = require('express');
const pedidosController = require('../controllers/pedidosController');

const router = express.Router();

// Ruta para obtener todos los pedidos
router.get('/pedidos', pedidosController.getAllPedidos);

// Ruta para guardar un nuevo pedido
router.post('/pedidosave', pedidosController.savePedido);

// Ruta para editar un pedido
router.post('/pedidoedit/:id', pedidosController.editPedido);

// Ruta para eliminar un pedido
router.get('/pedidodelete/:id', pedidosController.deletePedido);

module.exports = router;