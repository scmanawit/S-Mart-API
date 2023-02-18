import Product from "../models/Product.js";

const correctProduct = async (request, response, next) => {
    const productId = request.params.productId

    const product = await Product.findOne({_id: productId}).exec()
    if (!product){
        return response.send(401, 'Incorrect product id')
    }

    next();
}

export {
    correctProduct
}