const Categories = require('../models/categoryModel')

const categoryController = {
    getCategories: async (req, res) => {
        try {
            res.json(await Categories.find())
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    createCategory: async (req, res) => {
        try {
            const { name } = req.body

            const duplicate = await Categories.findOne({ name: name })
            if (duplicate) return res.status(400).json({ message: "Category with specified name already exists" })

            const category = new Categories({name})
            
            await category.save()

            res.json(category)

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    updateCategories: async (req, res) => {
        try {
            const {name} = req.body

            req.category.name = name
            await req.category.save()

            res.json({ message: "Animal Updated" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    deleteCategories: async (req, res) => {
        try {
            await req.category.remove()
            res.json({ message: "Deleted category sucessfully" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = categoryController