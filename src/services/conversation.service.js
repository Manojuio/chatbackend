
const Conversation = require("../models/conversation.model");

const createConversation = async ({
  userId,
  userRole,
  type,
  participantId,
  participantIds,
  name
}) => {
  try {
    if (!type) throw new Error("Type is required");

    if (type === "one-to-one") {

      if (!participantId) throw new Error("Participant id is required");
      if (participantId.toString() === userId.toString())
        throw new Error("Cannot create conversation with yourself");

      const existConversation = await Conversation.findOne({
        type: "one-to-one",
        participants: { $all: [userId, participantId] }
      });

      if (existConversation) return existConversation;

      return await Conversation.create({
        type,
        participants: [userId, participantId],
        createdBy: userId
      });
    }

    if (type === "group") {
      
      if (userRole !== "admin")
        throw new Error("Only admin can create group conversation");
      if (!name) throw new Error("Group name is required");
      if (!Array.isArray(participantIds) || participantIds.length < 2)
        throw new Error("Group conversation must have at least 2 participants");

      const uniqueParticipants = Array.from(
        new Set([...participantIds.map(String), userId.toString()])
      );

      return await Conversation.create({
        type,
        participants: uniqueParticipants,
        name,
        createdBy: userId
      });
    }

    throw new Error("Invalid conversation type");
  } catch (error) {
    throw new Error(`CreateConversation failed: ${error.message}`);
  }
};

const getUserConversations = async (userId) => {
  try {
    return await Conversation.find({ participants: userId })
      .populate("participants", "username email")
      .sort({ updatedAt: -1 });
  } catch (error) {
    throw new Error(`GetUserConversations failed: ${error.message}`);
  }
};

module.exports = {
  createConversation,
  getUserConversations,
};