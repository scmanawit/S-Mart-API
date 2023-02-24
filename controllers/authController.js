import bcrypt from 'bcrypt'

import { createAccessToken } from '../helpers/auth.js'
import { getOrder, getOrderBy, saveOrder } from '../helpers/order.js';
import { getUserBy, saveUser } from '../helpers/user.js'

const register = async (request, response) => {
    try {
        const input = request.body;

        const user = await getUserBy({ email: input.email })
        if (user) {
            return response.send(403, "The email is already taken!")
        }

        let newUser = await saveUser({
            name: input.name,
            email: input.email,
            password: bcrypt.hashSync(input.password, 10),
        })

        return response.send(newUser);
    } catch (error) {
        console.log(error);
        return response.send(500, 'Server error!')
    }

}

const registerAdmin = async (request, response) => {
    try {
        const input = request.body

        const user = await getUserBy({ email: input.email })
        if (user) {
            return response.send("The email is already taken!")
        }

        let newAdmin = await saveUser({
            name: input.name,
            email: input.email,
            password: bcrypt.hashSync(input.password, 10),
            isAdmin: true
        })

        return response.send(newAdmin)

    } catch (error) {
        return response.send(error)
    }
}

const login = async (request, response) => {
    try {
        let input = request.body;

        const user = await getUserBy({ email: input.email })
        if (user === null) {
            return response.send(401, "Email is not yet registered. Register first before logging in!")
        }

        const isPasswordCorrect = bcrypt.compareSync(input.password, user.password)
        if (!isPasswordCorrect) {
            return response.send(403, 'Password Incorrect!')
        }

        if (!user.isAdmin) {
            const existingCart = await getOrderBy({ user: user._id, status: "pending" })
            if (!existingCart) {
                await saveOrder({ user: user._id })
            }
        }

        return response.send({ auth: createAccessToken(user) })
    } catch (error) {
        return response.send(500, 'Server error!')
    }
}

export default {
    register,
    login,
    registerAdmin
}