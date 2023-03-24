import mongoose from "mongoose";

const Conversations = new mongoose.Schema({
    participants: { type: [], required: true }, // emails
    messages: { type: [], required: true }, // Store _id
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
})
export default mongoose.models.Conversations || mongoose.model('Conversations', Conversations)