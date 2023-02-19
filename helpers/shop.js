import Shop from "../models/Shop.js"

export const getShop = async (shopId) => {
    return await Shop
        .findById(shopId)
        .populate('user', { createdAt: false, password: false, '__v': false })
        .populate('products', { createdAt: false, __v: false })
        .exec()
}

export const getShopBy = async (filters) => {
    return await Shop
        .findOne(filters)
        .populate('user', { createdAt: false, password: false, '__v': false })
        .populate('products', { createdAt: false, __v: false })
        .exec()
}

export const getShopsBy = async (filters) => {
    return await Shop
        .find(filters)
        .populate('user', { createdAt: false, password: false, '__v': false })
        .populate('products', { createdAt: false, __v: false })
        .exec()
}

export const saveShop = async (data, shopId = null) => {
    if (shopId) {
        return await Shop.findByIdAndUpdate(shopId, data, { new: true }).exec()
    }

    const shop = new Shop(data)
    await shop.save()
    return shop
}

export const getFilterValue = (value) => {
    if (value) {
        return { $ne: null }
    }

    return null
}