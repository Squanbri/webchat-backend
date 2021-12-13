const express = require('express');
const MessageController = require('../controllers/MessageController');
const router = express.Router();

router.post('/', MessageController.create)
router.post('/dialog/', MessageController.getDialog)
router.post('/checkAll/', MessageController.checkAllMessages)
router.post('/lastMessage/', MessageController.getLastMessage)
router.post('/unchecked/', MessageController.getCountUncheckedMessages)

module.exports = router