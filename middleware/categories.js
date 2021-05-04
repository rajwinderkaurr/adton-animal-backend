const Categories = require('../models/categoryModel')

verifyCategory = async (req, res, next) => {
    const id = req.params.id
    if (!id) return res.status(400).json({ message: "Please preovide an ID" })

    const category = await Categories.findById(id)
    if (!category) return res.status(400).json({ message: "Category with specified ID does not exist" })

    req.category = category

    next()
}

module.exports = verifyCategory