import mongoose from "mongoose";

const Product = new mongoose.Schema({
    shopId:{
        type: String,
        required: [true, "Shop Id is required!"]
    },
    image:{
        type: String,
        default: 'http://www.rcdrilling.com/wp-content/uploads/2013/12/default_image_01-1024x1024-570x321.png'
    },
    productName:{
        type: String,
        required: [true, "Product name is required!"]
    },
    description:{
        type: String,
        required: [true, "Description is required!"]
    },
    price:{
        type:Number,
        required: [true, "Price is required!"]
    },
    categories: [String],
    createdAt:{
        type: Date,
        default: new Date()
    },
    deletedAt:{
        type: Date,
        default: null
    }

})

export default mongoose.model("products", Product)