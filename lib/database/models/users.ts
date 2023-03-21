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
    chat: {
        type:
            [
                {
                    name: String,
                    email: String,
                    messages: {
                        author: String,
                        message: String
                    }
                }
            ],
        required: true
    }

})
export default mongoose.models.Users || mongoose.model('Users', Users)