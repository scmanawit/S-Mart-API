import Order from "../models/Order.js"

export const getOrder = async (orderId) => {
    return await Order.findById(orderId, { password: false }).populate('products.product', {createdAt: false, __v: false}).exec()
}

export const getOrderBy = async (filters) => {
    return await Order.findOne(filters).populate('products.product', {createdAt: false,  __v: false}).exec()
}

export const getOrdersBy = async (filters) => {
    return await Order.find(filters).populate('products.product', {createdAt: false, __v: false}).sort({createdAt: 'desc'}).exec()
}

export const saveOrder = async (data, orderId = null) => {
    if (orderId) {
        return await Order.findByIdAndUpdate(orderId, data, { new: true }).exec()
    }

    const order = new Order(data)
    await order.save()
    return order
}

