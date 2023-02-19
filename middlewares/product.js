import { getProduct } from "../helpers/product.js";

const verifyProduct = async (request, response, next) => {
    const product = await getProduct(request.params.productId)
    if (!product){
        return response.send(401, 'Incorrect product id')
    }

    response.locals.product = product
    next();
}

export {
    verifyProduct
}