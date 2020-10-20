const express = require('express');
const { protectRoute } = require('../controllers/authControllers');
const { getGatitos, getGatito, postGatito, deleteGatito, putGatito, patchGatito } = require('../controllers/GatitoControllers');
const router = express.Router();

router.get('/', getGatitos);
router.get('/:id', getGatito);
router.post('/', protectRoute, postGatito);
router.delete('/:id', protectRoute, deleteGatito);
router.put('/:id', protectRoute, putGatito);
router.patch('/:id', protectRoute, patchGatito);


module.exports = router;
