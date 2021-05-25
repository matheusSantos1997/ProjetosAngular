const express = require('express');
const router = express.Router();
const PersonController = require('../controllers/PersonController');
const ProductController = require('../controllers/ProductController');
const AuthController = require('../controllers/AuthController');

router.use(AuthController.check_token);

// rotas
router.get('/people', PersonController.all);
router.get('/product', ProductController.all);

module.exports = router;

