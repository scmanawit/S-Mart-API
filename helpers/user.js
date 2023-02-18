import User from "../models/User.js"

export const getUser = async (userId) => {
    return await User.findById(userId, { password: false }).exec()
}

export const getUserBy = async (filters) => {
    return await User.findOne(filters).exec()
}

export const getUsersBy = async (filters) => {
    return await User.find(filters).exec()
}

export const saveUser = async (data, userId = null) => {
    if (userId) {
        return await User.findByIdAndUpdate(userId, data, { new: true }).exec()
    }

    const user = new User(data)
    await user.save()
    return user
}

