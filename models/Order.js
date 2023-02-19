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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, "user is required!"]
    },
    products: [
        {
            
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: [true, "Product is required!"]
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