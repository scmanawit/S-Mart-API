import Order from "../models/Order.js"

export const getOrder = async (userId) => {
    return await Order.findById(userId, { password: false }).exec()
}

export const getOrderBy = async (filters) => {
    return await Order.findOne(filters).exec()
}

export const getOrdersBy = async (filters) => {
    return await Order.find(filters).exec()
}

export const saveOrder = async (data) => {
    const order = new Order(data)
    await order.save()
    return order
}

