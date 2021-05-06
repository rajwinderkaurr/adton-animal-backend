const mongoose = require('mongoose');
const Animals = require('../models/animalModel');
const Adoptions = require('../models/animalModel');

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
            const rawAnimal = await Animals.findById(req.params.id)
            const adoptions = await Adoptions.countDocuments({category: (await "jkasdf")})

            res.json({rawAnimal, adoptions})
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    createAnimal: async (req, res) => {
        try {
            const { name, category, dob: date, description, images, breed  } = req.body
            
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