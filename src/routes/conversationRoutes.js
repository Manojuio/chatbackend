const express = require('express');
const { getConversations, getMessages, createConversation } = require('../controllers/conversationController');
const router = express.Router();

router.get('/conversations', getConversations);
router.get('/messages/:conversationId', getMessages);
router.post('/conversation', createConversation);

module.exports = router;