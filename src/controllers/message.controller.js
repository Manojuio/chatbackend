const messageService = require("../services/message.service.js")

const sendMessage = async (req,res,next)=>{
    try{
        const userId = req.user._id;
        const {conversationId}=req.params;
        const {content} = req.body;

        const message = await messageService.sendMessage(
            {userId,
                conversationId ,
                content});
        res.status(201).json(message);
    }catch(error){
        next(error);
    }
}

const getMessages = async (req,res,next)=>{
    try{
        const userId = req.user._id;
        const {conversationId}=req.params;
        const {limit,skip} = req.query;

        const messages = await messageService.getMessages(
            {userId,
            conversationId,
            limit,
            skip});

        res.status(200).json(messages);
    }catch(error){
        next(error);
    }
}

module.exports = {
    sendMessage,
    getMessages
}