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
    return await Product.findOne(filters).exec()
}

export const getProductsBy = async (filters) => {
    return await Product.find(filters).exec()
}

export const getProduct = async (productId) => {
    return await Product.findById(productId).exec()
}
