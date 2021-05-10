const express = require('express');
const router = express.Router();
const PersonController = require('../controllers/PersonController');
const ProductController = require('../controllers/ProductController');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rotas
router.get('/people', PersonController.all);
router.get('/product', ProductController.all);

module.exports = router;

