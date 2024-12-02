const express = require('express');
const router = express.Router();

const clientesController = require('../controllers/clientesController');

router.get('/cltsview', clientesController.list); // ver clientes con get
router.get('/cltdelete:id', clientesController.delete); // eliminar clientes con post
router.get('/cltsave', clientesController.save); // ver clientes con get

router.get('/' , (req,res) => {
    res.send('Directorio Home');
});

module.exports = router;