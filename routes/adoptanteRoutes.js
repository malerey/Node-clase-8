const express = require('express');
const { protectRoute } = require('../controllers/authControllers');
const { getAdoptantes, getAdoptante, postAdoptante, deleteAdoptante, putAdoptante, patchAdoptante } = require('../controllers/adoptanteControllers');
const router = express.Router();

router.get('/', getAdoptantes);
router.get('/:id', getAdoptante);
router.post('/', protectRoute, postAdoptante);
router.delete('/:id', protectRoute, deleteAdoptante);
router.put('/:id', protectRoute, putAdoptante);
router.patch('/:id', protectRoute, patchAdoptante);


module.exports = router;
