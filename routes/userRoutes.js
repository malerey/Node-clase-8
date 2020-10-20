const express = require('express');
const { onlyAdmin, protectRoute, signup, login } = require('../controllers/authControllers');
const { getUsers, getUser, postUser, deleteUser, putUser } = require('../controllers/userControllers');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', protectRoute, onlyAdmin, postUser);
router.delete('/:id', protectRoute, onlyAdmin, deleteUser);
router.put('/:id', protectRoute, onlyAdmin, putUser);

module.exports = router;
