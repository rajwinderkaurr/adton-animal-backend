const mongoose = require('mongoose');
const Animals = require('../models/animalModel');
const Adoptions = require('../models/animalModel');
const mailer = require('../utils/mailer')

const animalController = {
    getAnimals: async (req, res) => {
        try {
            res.json(await Animals.find())
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getSingleAnimal: async (req, res) => {
        try {
            const { id } = req.params
            if (!id || id.length !== 24) return res.status(400).json({ message: "Please provide the correct id" })
            
            const rawAnimal = await Animals.findById(id)

            if (!rawAnimal) return res.status(400).json({ message: "Animal with this id does not exist" })

            const adoptions = await Adoptions.countDocuments({animalId: rawAnimal.id})
            res.json({rawAnimal, adoptions})
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getWithSameCategoryId: async (req, res) => {
        try {
            const animals = await Animals.find({category: (await Animals.findById(req.params.id)).category})

            res.json({animals})
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getWithSameCategoryName: async (req, res) => {
        try {
            const animals = await Animals.find({category: req.body.category})

            res.json({animals})
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    createAnimal: async (req, res) => {
        try {
            const { name, category, dob, description, images, breed  } = req.body
            
            if (!(name && category && dob && description && images && breed))
                return res.status(400).json({ message: "Please enter all details about the animal" })

            const animal = new Animals({
                name, category, dob, description, images, breed
            })
            
            const newAnimal = await animal.save()
            res.json(newAnimal)

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    updateAnimal: async (req, res) => {
        try {
            const {
                name, category, dob, description, images, breed
            } = req.body

            await Animals.findByIdAndUpdate(req.animal._id, {
                $set: {name, category, dob, description, images, breed}
            }, { useFindAndModify: false })

            res.json({ message: "Animal Updated" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    deleteAnimal: async (req, res) => {
        try {
            const detetedAnimal = await req.animal.remove()

            res.json({ message: "Successfully Deleted Animal" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports =  animalController