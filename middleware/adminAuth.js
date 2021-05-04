const jwt = require('jsonwebtoken')
const Users = require('../models/userModel')

const adminAuth = async (req, res, next) => {
    try {
        const user = await Users.findById(req.user.id)

        if (user.role === 0) 
            return res.status(400).json({ message: "Admin access denied" })
        
        next()

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = adminAuth