import { response } from "express";
import { decode } from "../helpers/auth.js";
import { getProductBy, saveProduct } from "../helpers/product.js";
import { getShopBy } from "../helpers/shop.js";
import Product from "../models/Product.js";

const addProduct = async (request, response) => {
    try {
        const shopId = request.params.shopId
        const userData = decode(request.headers.authorization)

        const shop = await getShopBy({ _id: shopId })
        if (shop.userId !== userData._id) {
            return response.send(401, 'Unauthorized!')
        }

        let input = request.body;

        let newProduct = new Product({
            shopId: shopId,
            productName: input.productName,
            description: input.description,
            price: input.price,
            categories: input.categories,
            stocks: input.stocks
        });

        await newProduct.save()
        return response.send(newProduct)

    } catch (error) {
        return response.send(500, "Server Error!")

    }
}

const viewActiveProducts = async (request, response) => {
    try {
        const products = await Product.find({ deletedAt: null }).exec()
        // console.log(products);
        return response.send(products)
    } catch (error) {
        // console.log(error);
        return response.send(500, "Server Error!")

    }
}

const viewProduct = async (request, response) => {
    try {
        const productId = request.params.productId
        const product = await Product.findOne({ _id: productId }).exec()

        return response.send(product)


    } catch (error) {
        return response.send(500, "Server Error!")

    }
}

const updateProduct = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization)
        const productId = request.params.productId

        const product = await getProductBy({ _id: productId })
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
        },
            productId
        )

        return response.send(productUpdated)

    } catch (error) {
        return response.send(500, "Server Error!")
    }




}

const archiveProduct = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization)
        const productId = request.params.productId

        const product = await getProductBy({ _id: productId })
        const shopProduct = await getShopBy({
            _id: product.shopId,
            userId: userData._id
        })

        if (!shopProduct) {
            return response.send(401, 'Invalid Product Id / user Id!')
        }

        const deletedProduct = await saveProduct({ deletedAt: new Date() }, productId)
        return response.send(deletedProduct)
    } catch (error) {
        return response.send(500, "Server Error!")

    }

}

export default {
    addProduct,
    viewActiveProducts,
    viewProduct,
    updateProduct,
    archiveProduct
}