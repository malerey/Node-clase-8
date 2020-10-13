const express = require('express');
const { getUsers, getUser, postUser, deleteUser, putUser, checkId } = require('../controllers/userControllers');
const router = express.Router();

// router.param('id', checkId);

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', postUser);
router.delete('/:id', deleteUser);
router.put('/:id', putUser);

module.exports = router;
