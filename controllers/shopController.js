import { decode } from "../helpers/auth.js";
import { getShopBy, saveShop } from "../helpers/shop.js";


const create = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization)
        let input = request.body

        let newShop = await saveShop({
            userId: userData._id,
            shopName: input.shopName,
            description: input.description
        })
        return response.send(newShop)
    } catch (error) {
        return response.send(500, "Server Error!")

    }
}

const verify = async (request, response) => {

    try {
        const shopId = request.params.shopId

        const shop = await getShopBy({
            _id: shopId,
            deletedAt: null
        })
        if (!shop) {
            return response.send(404, 'shop not found!')
        }

        const newShop = await saveShop({ verifiedAt: new Date() }, shopId)
        return response.send(newShop)
    } catch (error) {
        console.log(error);
        return response.send(500, "Server Error!")

    }

}

const view = async (request, response) => {
    try {
        return response.send(response.locals.shop)
    } catch (error) {
        return response.send(500, 'Server error')
    }
}

const update = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization)
        const input = request.body
        const shopId = request.params.shopId
        const shop = response.locals.shop

        if (userData._id !== shop.userId) {
            return response.send(401, 'Unauthorized')
        }

        let updatedShop = {
            image: input.image,
            shopName: input.shopName,
            description: input.description,
        }

        const newShop = await saveShop(updatedShop, shopId)
        return response.send(newShop)

    } catch (error) {
        return response.send(500, 'Server error')
    }
}

const deactivate = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization)
        const shop = response.locals.shop

        if (userData._id !== shop.userId) {
            return response.send(401, 'Unauthorized')
        }

        const newShop = await saveShop({deletedAt: new Date()}, shop)
        return response.send(newShop)

    } catch (error) {
        return response.send(500, 'Server error')
    }
}

const banShop = async (request, response) => {
    try {
        const shopId = request.params.shopId
        const reason = request.body.reason

        const shopDeleted = await saveShop({ deletedAt: new Date(), deactivateReason: reason }, shopId)

        return response.send(shopDeleted)

    } catch (error) {
        console.log(error)
        return response.send(500, 'Server error')
    }
}


export default {
    create,
    verify,
    view,
    update,
    deactivate,
    banShop,
}