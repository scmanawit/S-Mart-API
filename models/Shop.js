import mongoose from "mongoose";

const Shop = new mongoose.Schema({
    image:{
        type: String,
        default: 'http://www.rcdrilling.com/wp-content/uploads/2013/12/default_image_01-1024x1024-570x321.png'
    },
    userId:{
        type: String,
        required: [true, "userId is required!"]

    },
    shopName:{
        type: String,
        required: [true, "Product name is required!"]
    },
    description:{
        type: String,
        required: [true, "Description is required!"]
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    deletedAt:{
        type: Date,
    }

})

export default mongoose.model("shops", Shop)