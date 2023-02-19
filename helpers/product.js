import Product from "../models/Product.js"


export const saveProduct = async (data, productId = null) => {
    if (productId) {
        return await Product.findByIdAndUpdate(productId, data, { new: true }).exec()
    }

    const product = new Product(data)
    await product.save()
    return product
}

export const getProductBy = async (filters) => {
    return await Product.findOne(filters).populate('shop', {createdAt: false, verifiedAt: false, __v: false}).exec()
}

export const getProductsBy = async (filters) => {
    return await Product.find(filters).populate('shop', {createdAt: false, verifiedAt: false, __v: false}).exec()
}

export const getProduct = async (productId) => {
    return await Product.findById(productId).populate('shop', {createdAt: false, verifiedAt: false, __v: false}).exec()
}
