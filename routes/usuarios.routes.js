const express = require('express');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const controller = require('../controllers/usuarios.controller');

const router = express.Router();

router.get('/', verifyToken, isAdmin, controller.listar);
router.get('/:id', verifyToken, isAdmin, controller.obtener);
router.post('/', verifyToken, isAdmin, controller.crear);
router.put('/:id', verifyToken, isAdmin, controller.actualizar);
router.delete('/:id', verifyToken, isAdmin, controller.eliminar);
router.put('/:id/rol', verifyToken, isAdmin, controller.cambiarRol);

module.exports = router;
