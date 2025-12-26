const conversationService = require("../services/conversation.service");

const createConversation = async (req, res ,next) => {
  try{
    const userId=req.user._id;
    const userRole=req.user.role;
    const {type,participantId,participantIds,name} = req.body;
    const conversation = await conversationService.createConversation({userId,userRole,type,participantId,participantIds,name});
    res.status(201).json(conversation);
  }catch(error){
    next(error);
  }


};
 
const getUserConversations = async (req, res ,next) => {
  try{
    const userId=req.user._id;
    const conversations = await conversationService.getUserConversations(userId);
    res.status(200).json(conversations);
  }catch(error){
    next(error);
  }
};
module.exports = {
  createConversation,
  getUserConversations,
};
