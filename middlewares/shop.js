import Shop from "../models/Shop.js"

const verify = async (request, response, next) => {
    const shopId = request.params.shopId

    const shop = await Shop.findOne({_id: shopId}).exec()
    if (!shop.isVerified){
        return response.send(401, 'shop is not yet verified')
    }

    // const user = decode(request.headers.authorization)
    // if (user.isAdmin) {
    //     response.send(401, 'Unathorized!')
    // }

    next();
}

export {
    verify
}