const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

 router.get('/' , homeController.home); // ver articulos con get

module.exports = router;