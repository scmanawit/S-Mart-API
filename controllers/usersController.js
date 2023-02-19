import { decode } from '../helpers/auth.js'
import { getOrderBy } from '../helpers/order.js'
import { getUser, saveUser } from '../helpers/user.js'

// retrieve user profile
const profile = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization)

        let user = await getUser(userData._id)
        if (!userData.isAdmin) {
            user = user.toJSON()

            const userOrder = await getOrderBy({ user: userData._id })
            user.orders = userOrder
        }

        return response.send(user)
    } catch (error) {
        // console.log(error);
        return response.send(500, "There was an error! Please try again!")
    }


}

const deactivate = async (request, response) => {
    try {
        const user = decode(request.headers.authorization)
        const userId = request.params.userId || user._id
        const reason = request.body.reason

        const userDeleted = await saveUser({ deletedAt: new Date(), deactivateReason: reason }, userId)
        return response.send(userDeleted)
    } catch (error) {
        // console.log(error);
        return response.send(500, 'Server Error')
    }
}

export default {
    profile,
    deactivate
}
