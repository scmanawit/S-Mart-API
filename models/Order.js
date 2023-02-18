import mongoose from "mongoose";

const Order = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: new Date
    },
    transactionDate: {
        type: Date,
    },
    status: {
        type: String,
        default: 'pending'
    },
    total: {
        type: Number,
        default: 0
        
    },
    userId: {
        type: String,
        required: [true, "UserId is required!"]
    },
    products: [
        {
            
            productId: {
                type: String,
                required: [true, "productId is required!"]
            },
            quantity: {
                type: Number,
                required: [true, "quantity is required!"]
            },
            subTotal: {
                type: Number,
                default: 0
            }
        }
    ]
})

export default mongoose.model("orders", Order)