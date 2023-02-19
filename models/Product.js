import mongoose from "mongoose";
import Shop from "./Shop.js";

const Product = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shops'
    },
    image: {
        type: String,
        default: 'http://www.rcdrilling.com/wp-content/uploads/2013/12/default_image_01-1024x1024-570x321.png'
    },
    productName: {
        type: String,
        required: [true, "Product name is required!"]
    },
    description: {
        type: String,
        required: [true, "Description is required!"]
    },
    price: {
        type: Number,
        required: [true, "Price is required!"]
    },
    categories: [String],
    stocks: {
        type: Number,
        default: 0
    },
    sales: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    deletedAt: {
        type: Date,
    },
    deletedReason: {
        type: String
    },
    reviews: [
        {
            userId: {
                type: String,
                required: [true, "userId is required!"]
            },
            message: {
                type: String
            }
        }
    ]

})

export default mongoose.model("products", Product)