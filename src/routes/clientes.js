const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/clientesController');

router.get('/cltsview', clientesController.list); // ver clientes con get
router.get('/cltdelete/:id', clientesController.delete); // eliminar clientes con get
router.post('/cltsave', clientesController.save); // guardar clientes con post
router.post('/cltedit/:id', clientesController.update);  // Ruta para actualizar un cliente

// router.get('/' , (req,res) => {
//     res.send('Directorio Home');
// });

module.exports = router;