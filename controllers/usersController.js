import { decode } from '../helpers/auth.js'
import { getOrderBy } from '../helpers/order.js'
import { getUser, saveUser } from '../helpers/user.js'
import bcrypt from 'bcrypt'

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
        return response.send(500, "There was an error! Please try again!")
    }
}

// retrieve user profile
const update = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization)
        const input = request.body
        const filters = {}

        if (input.name) {
            filters.name = input.name
        }

        if (input.email) {
            filters.email = input.email
        }

        if (input.address) {
            filters.address = input.address
        }

        if (input.password) {
            filters.password = bcrypt.hashSync(input.password, 10)
        }

        let newUser = await saveUser(filters, userData._id)

        return response.send(newUser)
    } catch (error) {
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
        return response.send(500, 'Server Error')
    }
}

export default {
    profile,
    deactivate,
    update
}
