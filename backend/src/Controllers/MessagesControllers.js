import { Messages } from "../Models/MessagesModel.js"




export const PostMessage = async (req, res) => {
  try {
    const { sender_id, receiver_id, message } = req.body;

    // Optional debug logging
    console.log('POST /Post-message', { sender_id, receiver_id, message });

    if (!sender_id || !receiver_id || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newMessage = await Messages.create({
      sender_id,
      receiver_id,
      message,
    });

    res.status(200).json(newMessage);
  } catch (err) {
    console.error('Message Error:', err);
    res.status(500).json({ error: 'Failed to send message', details: err.message });
  }
};



export const getMessages = async (req, res) => {
  try {
    const { sender_id, receiver_id } = req.params;

    const messages = await Messages.find({
      $or: [
        { sender_id, receiver_id },
        { sender_id: receiver_id, receiver_id: sender_id }
      ]
    }).sort({ createdAt: 1 }); 

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages', details: err.message });
  }
};
