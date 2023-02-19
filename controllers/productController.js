import { decode } from "../helpers/auth.js";
import { getProductsBy, saveProduct } from "../helpers/product.js";
import { getShopBy } from "../helpers/shop.js";
import { getFilterValue } from "../helpers/shop.js";

const addProduct = async (request, response) => {
    try {
        const shopId = request.params.shopId
        const userData = decode(request.headers.authorization)

        const shop = await getShopBy({ _id: shopId })
        if (shop.userId !== userData._id) {
            return response.send(401, 'Unauthorized!')
        }

        let input = request.body;

        let newProduct = await saveProduct({
            shopId: shopId,
            productName: input.productName,
            description: input.description,
            price: input.price,
            categories: input.categories,
            stocks: input.stocks
        })

        return response.send(newProduct)

    } catch (error) {
        return response.send(500, "Server Error!")

    }
}

const viewActiveProducts = async (request, response) => {
    try {
        const products = await getProductsBy({ deletedAt: null })
        return response.send(products)
    } catch (error) {
        return response.send(500, "Server Error!")
    }
}

const viewProduct = async (request, response) => {
    try {
        return response.send(response.locals.product)
    } catch (error) {
        return response.send(500, "Server Error!")

    }
}

const updateProduct = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization)
        const product = response.locals.product

        const shopProduct = await getShopBy({
            _id: product.shopId,
            userId: userData._id
        })

        if (!shopProduct) {
            return response.send(401, 'Invalid Product Id / user Id!')
        }

        const updatedImage = request.body.image
        const updatedProductName = request.body.productName
        const updatedDescription = request.body.description
        const updatedPrice = request.body.price
        const updatedStocks = request.body.stocks

        const productUpdated = await saveProduct({
            image: updatedImage,
            productName: updatedProductName,
            description: updatedDescription,
            price: updatedPrice,
            stocks: updatedStocks
        }, product._id)

        return response.send(productUpdated)
    } catch (error) {
        return response.send(500, "Server Error!")
    }
}

const archiveProduct = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization)
        const product = response.locals.product
        const filter = { _id: product.shopId }

        if (!userData.isAdmin) {
            filter.userId = userData._id
        }

        const shopProduct = await getShopBy(filter)
        if (!shopProduct) {
            return response.send(401, 'Invalid Product Id / user Id!')
        }

        const deletedProduct = await saveProduct({ deletedAt: new Date(), deletedReason: request.body.reason }, product._id)
        return response.send(deletedProduct)
    } catch (error) {
        return response.send(500, "Server Error!")

    }

}

const getAllProduct = async (request, response) => {
    try {

        const input = request.body
        const filters = {}

        if (input.deletedAt !== undefined) {
            filters.deletedAt = getFilterValue(input.deleted)
        }

        const products = await getProductsBy (filters)
        return response.send(products)
    } catch (error) {
        return response.send(500, 'Server error')
    }
}


export default {
    addProduct,
    viewActiveProducts,
    viewProduct,
    updateProduct,
    archiveProduct,
    getAllProduct
}