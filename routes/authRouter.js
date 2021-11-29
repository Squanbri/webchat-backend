const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();


router.post('/registration', AuthController.registration)
router.post('/auth', AuthController.login)
router.get('/auth')

module.exports = router