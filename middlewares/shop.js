import { getShopBy } from "../helpers/shop.js"

const verify = async (request, response, next) => {
    const shopId = request.params.shopId

    const shop = await getShopBy({
        _id: shopId,
        deletedAt: null
    })
    if (!shop) {
        return response.send(404, 'shop not found')
    }

    if (!shop.verifiedAt) {
        return response.send(401, 'shop is not yet verified')
    }

    response.locals.shop = shop
    next()
}

export {
    verify
}