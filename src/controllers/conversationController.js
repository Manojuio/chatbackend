const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

// GET /conversations?userId=...
exports.getConversations = async (req, res) => {
  try {
    const { userId } = req.query;
    const convs = await Conversation.find({ participants: userId }).populate('participants');
    res.json(convs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /messages/:conversationId
exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort('createdAt');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /conversation
exports.createConversation = async (req, res) => {
  try {
    const { participants } = req.body; // array of user IDs
    const conversation = new Conversation({ participants });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};