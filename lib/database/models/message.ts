import mongoose from "mongoose";

const Message = new mongoose.Schema({
    content: { type: String },
    sender: { type: String },
    receiver: { type: String },
    createdAt: { type: Date, default: Date.now() }
})
export default mongoose.models.Message || mongoose.model('Message', Message)