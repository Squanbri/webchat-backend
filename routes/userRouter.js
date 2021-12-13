const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();


router.get('/users', UserController.getAll)
router.post('/user', UserController.getUser)
router.put('/', UserController.update)

module.exports = router