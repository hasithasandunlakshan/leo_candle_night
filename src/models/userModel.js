import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    indexNumber: {
        type: String,
        required: [true, "Please provide a index number"],
        unique: true
    },
    phoneNumber: {
        type: String,
        required: [true, "Please provide a phone number"],
    
    },
    faculty: {
        type: String,
        required: [true, "Please provide a faculty"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },

})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;