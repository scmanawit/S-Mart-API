import config from "../config.js";
import jwt from 'jsonwebtoken'
import { decode } from "../helpers/auth.js";
import { getUser } from "../helpers/user.js";

const authenticated = async (request, response, next) => {
    let token = request.headers.authorization;

    if (!token) {
        return response.send(401, 'Unathorized!')
    }

    token = token.slice(7, token.length);

    let user = jwt.verify(token, config.JWT_SECRET)
    if (user) {
        user = await getUser(user._id)
        // console.log('user', user);
        if (user.deletedAt) {
            return response.send(401, 'Unathorized!')
        }
        return next()
    }

    return response.send(401, 'Unathorized!')
}

const user = (request, response, next) => {
    const user = decode(request.headers.authorization)
    if (user.isAdmin) {
        response.send(401, 'Unathorized!')
    }

    next();
}

const admin = (request, response, next) => {
    const user = decode(request.headers.authorization)
    if (!user.isAdmin) {
        response.send(401, 'Unathorized!')
    }

    next();
}

export {
    authenticated,
    user,
    admin
}
