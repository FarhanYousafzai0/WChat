import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true, // fixed typo: 'requred' → 'required'
  },
  time: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const Messages = mongoose.model('Message', MessageSchema);
