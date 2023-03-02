import mongoose from "mongoose";

const Users = new mongoose.Schema({
    id: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

export default mongoose.models.Users || mongoose.model('Users', Users)