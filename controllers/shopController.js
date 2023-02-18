import { response } from "express";
import { decode } from "../helpers/auth.js";
import Shop from "../models/Shop.js";


const createShop = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization)
        let input = request.body

        let newShop = new Shop({
            userId: userData._id,
            shopName: input.shopName,
            description: input.description
        })

        await newShop.save()
        return response.send(newShop)
    } catch (error) {
        return response.send(500, "Server Error!")

    }
}

const verifyShop = async (request, response) => {

    try {
        const userData = decode(request.headers.authorization)
        const shopId = request.params.shopId
        // console.log('sid', shopId);

        let updatedShop = {
            isVerified: true
        }

        const shop = await Shop.findOne({ _id: shopId }).exec()
        // console.log('shop', shop);
        if (!shop) {
            return response.send(404, 'shop not found!')
        }

        const newShop = await Shop.findByIdAndUpdate(shopId, updatedShop, { new: true })
        return response.send(newShop)

    } catch (error) {
        console.log(error);
        return response.send(500, "Server Error!")

    }

}

const viewMyShop = async (request, response) => {
    try {
        const shopId = request.params.shopId

        const shop = await Shop.findOne({ _id: shopId }).exec()
        // console.log('shop', shop);
        if (!shop) {
            return response.send(404, 'shop not found!')
        }


        return response.send(shop)
    } catch (error) {
        return response.send(500, 'Server error')
    }
}

const updateMyShop = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization)
        const input = request.body
        const shopId = request.params.shopId

        const shop = await Shop.findOne({ _id: shopId }).exec()
        if (userData._id !== shop.userId) {
            return response.send(401, 'Unauthorized')
        }

        let updatedShop = {
            image: input.image,
            shopName: input.shopName,
            description: input.description,
        }
        
    } catch (error) {
        return response.send(500, 'Server error')
    }
}


export default {
    createShop,
    verifyShop,
    viewMyShop,
    updateMyShop
}