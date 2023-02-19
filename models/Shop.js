import mongoose from "mongoose";

const Shop = new mongoose.Schema({
    image: {
        type: String,
        default: 'http://www.rcdrilling.com/wp-content/uploads/2013/12/default_image_01-1024x1024-570x321.png'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, "user is required!"]
    },
    shopName: {
        type: String,
        required: [true, "Product name is required!"]
    },
    description: {
        type: String,
        required: [true, "Description is required!"]
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    verifiedAt: {
        type: Date
    },
    deletedAt: {
        type: Date,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
        }
    ]
})

export default mongoose.model("shops", Shop)