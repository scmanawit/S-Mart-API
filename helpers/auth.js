import jwt from 'jsonwebtoken'
import config from '../config.js';

const createAccessToken = (user) => {
    if (!user) {
        throw new Error('User is undefined!')
    }

    const data = {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }

    return jwt.sign(data, config.JWT_SECRET, {});
}

const decode = (token) => {
    if (!token) {
        throw new Error('Token is undefined!')
    }

    token = token.slice(7, token.length);
    return jwt.verify(token, config.JWT_SECRET, (err, data) => {
        if (err) {
            throw new Error('Invalid token!')
        }

        return jwt.decode(token, { complete: true }).payload;
    })
}

export {
    createAccessToken,
    decode
}