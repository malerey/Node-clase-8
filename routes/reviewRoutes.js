const express = require('express');
const { protectRoute } = require('../controllers/authControllers');
const { getReviews, getReview, postReview, deleteReview, putReview, patchReview } = require('../controllers/ReviewControllers');
const router = express.Router();

router.get('/', getReviews);
router.get('/:id', getReview);
router.post('/', protectRoute, postReview);
router.delete('/:id', protectRoute, deleteReview);
router.put('/:id', protectRoute, putReview);
router.patch('/:id', protectRoute, patchReview);


module.exports = router;
