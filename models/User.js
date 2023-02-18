import mongoose from "mongoose";

const User = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "email is required!"]
    },
    email: {
        type: String,
        required: [true, "email is required!"]
    },
    password: {
        type: String,
        required: [true, "password is required!"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    deletedAt: {
        type: Date,
    },
    deactivateReason: {
        type: String
    }
})

export default mongoose.model("Users", User)