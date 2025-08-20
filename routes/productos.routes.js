const express = require('express');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const controller = require('../controllers/productos.controller');

const router = express.Router();

router.get('/', verifyToken, controller.getAll);
router.get('/:id', verifyToken, controller.getById);
router.post('/', verifyToken, isAdmin, controller.create);
router.put('/:id', verifyToken, isAdmin, controller.update);
router.delete('/:id', verifyToken, isAdmin, controller.delete);

module.exports = router;
