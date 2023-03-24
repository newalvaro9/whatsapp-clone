import mongoose from "mongoose";

const Users = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    lastMessage: {
        type: String
    }
})
export default mongoose.models.Users || mongoose.model('Users', Users)