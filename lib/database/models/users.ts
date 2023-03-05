import mongoose from "mongoose";

const Users = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    telephone: { type: String, required: true }
});

export default mongoose.models.Users || mongoose.model('Users', Users)