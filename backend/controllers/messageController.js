import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body; // Message content
    const { id: recieverId } = req.params; // Receiver ID from URL params
    const senderId = req.user._id; // Sender ID from the authenticated user (via middleware)

    // Validate required fields
    if (!message || !recieverId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Debugging logs
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", recieverId);

    // Find or create a conversation between the sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
        messages: [],
      });
    }

    // Create and save the new message
    const newMessage = await Message.create({
      senderId,
      recieverId,
      message,
    });

    // Add the message to the conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // Respond with the new message
    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
