import categories from "../constants/categories.js";
import { decode } from "../helpers/auth.js";
import { getProductsBy, saveProduct } from "../helpers/product.js";
import { getShop, getShopBy, saveShop } from "../helpers/shop.js";
import { getFilterValue } from "../helpers/shop.js";

const addProduct = async (request, response) => {
    try {
        const shopId = request.params.shopId
        const userData = decode(request.headers.authorization)

        const shop = await getShop(shopId)
        if (shop.user._id.toString() !== userData._id) {
            return response.send(401, 'Unauthorized!')
        }

        let input = request.body;

        let newProduct = await saveProduct({
            shop: shopId,
            productName: input.productName,
            description: input.description,
            price: input.price,
            categories: input.categories,
            stocks: input.stocks,
            image: input.image
        })

        shop.products.push(newProduct._id)
        await shop.save()

        return response.send(newProduct)

    } catch (error) {
        return response.send(500, "Server Error!")

    }
}

const viewActiveProducts = async (request, response) => {
    try {
        const categories = request.query.categories
        const filters = { 
            deletedAt: null
         }


        if (categories) {
            filters.categories = { $in: categories }
        }

        let products = await getProductsBy(filters)
        products = products.filter(product => (!product?.shop?.deletedAt))
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
            _id: product.shop,
            user: userData._id
        })

        if (!shopProduct) {
            return response.send(401, 'Invalid Product Id / user Id!')
        }

        const updatedImage = request.body.image
        const updatedProductName = request.body.productName
        const updatedDescription = request.body.description
        const updatedPrice = request.body.price
        const updatedStocks = request.body.stocks
        const updatedCategories = request.body.categories

        const productUpdated = await saveProduct({
            image: updatedImage,
            productName: updatedProductName,
            description: updatedDescription,
            price: updatedPrice,
            stocks: updatedStocks,
            categories: updatedCategories
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
        const filter = { _id: product.shop }

        if (!userData.isAdmin) {
            filter.user = userData._id
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

const getProductCategories = (request, response) => {
    return response.send(categories)
}

const activateProduct = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization)
        const product = response.locals.product
        const filter = { _id: product.shop }

        if (!userData.isAdmin) {
            filter.user = userData._id
        }

        const shopProduct = await getShopBy(filter)
        if (!shopProduct) {
            return response.send(401, 'Invalid Product Id / user Id!')
        }

        const activatedProduct = await saveProduct({ deletedAt: null, deletedReason: null }, product._id)
        return response.send(activatedProduct)
    } catch (error) {
        return response.send(500, "Server Error!")
    }
}

export default {
    addProduct,
    viewActiveProducts,
    viewProduct,
    updateProduct,
    archiveProduct,
    getAllProduct,
    getProductCategories,
    activateProduct
}