const Message = require("../models/message.model");
const Conversation = require("../models/conversation.model");


const sendMessage = async ({userId,conversationId ,content})=>{
    try{
      if(!content || !content.trim()){
        throw new Error("Message content is required");
      }
      const conversation = await Conversation.findById(conversationId);
      if(!conversation){
        throw new Error("Conversation not found");
      }
      const isparticipant = await conversation.participants.some(
        (id) => id.toString() === userId.toString()
      )
       if(!isparticipant){
        throw new Error("You are not a participant in this conversation");
       }
       const message = await Message.create({
        conversationId,
        senderId: userId,
        content

       });
       return message;

    }catch(error){
         throw new Error(`SendMessage failed: ${error.message}`);
    }
}

const getMessages = async ({userId,conversationId,limit = 20,skip = 0})=>{
    try{
    const conversation = await Conversation.findById(conversationId);
    if(!conversation){
        throw new Error("Conversation not found");
    }
    const isparticipant = await conversation.participants.some(
        (id) => id.toString() === userId.toString()
      )
       if(!isparticipant){
        throw new Error("You are not a participant in this conversation");
       }
       const messages = await Message.find({conversationId})
       .sort({createdAt: -1})
       .limit(Number(limit))
       .skip(Number(skip));
       return messages;
    }catch(error){
  throw new Error(`GetMessages failed: ${error.message}`);
    }
}

module.exports ={
    sendMessage,
    getMessages 
}