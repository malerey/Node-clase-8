const express = require('express');
const { protectRoute } = require('../controllers/authControllers');
const { getRefugios, getRefugio, postRefugio, deleteRefugio, putRefugio, patchRefugio } = require('../controllers/refugioControllers');
const router = express.Router();

router.get('/', getRefugios);
router.get('/:id', getRefugio);
router.post('/', protectRoute, postRefugio);
router.delete('/:id', protectRoute, deleteRefugio);
router.put('/:id', protectRoute, putRefugio);
router.patch('/:id', protectRoute, patchRefugio);


module.exports = router;
