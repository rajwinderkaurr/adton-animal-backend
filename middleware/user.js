const Users = require('../models/userModel')

const user = async (req, res, next) => {
    const requestedUser = await Users.findById(req.user.id).select('-password')

    if (!user) return res.json({ message: "User with the given ID was not found" })

    req.user = requestedUser
    next()
}

module.exports = user