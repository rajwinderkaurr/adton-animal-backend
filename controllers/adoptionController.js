const mongoose = require('mongoose');
const Adoptions = require('../models/adoptionModel')
const Users = require('../models/userModel')
const Animals = require('../models/animalModel');
const { request } = require('express');


const adoptionController = {
    getAdoptions: async (req, res) => {
        try {
            adoptions = await Adoptions.find()

            res.json(adoptions)
        } catch (error) {
            res.status(500).message({ message: error.message })
        }
    },
    createAdoptions: async (req, res) => {
        try {
            const { animal_id, id } = req.body

            const isAnimal = (animal_id.length === 24 && await Animals.exists({_id: animal_id}))

            if (!isAnimal) return res.status(400).json({ message: "Please provide the correct animal id" })

            const adoption = new Adoptions({ animal_id, requester_id: id })
            const newAdoption = await adoption.save()

            res.json({ newAdoption })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    changeAdoption: async (req, res) => {
        try {
            const { id }  = req.params
            const { allower_id } = req.body

            const isAllower = (allower_id.length === 24 && await Users.exists({_id: allower_id}))

            if (!isRequester || !isAnimal || !isAllower) return res.status(400).json({ message: "Please provide the correct allower id" })

            await Adoptions.findByIdAndUpdate(id, { allower_id })

            res.json({ message: "Adoption status changed" })
        } catch (error) {
            res.status(500).message({ message: error.message })
        }
    },
    deleteAdoptions: async (req, res) => {
        try {
            res.json(req.id)
        } catch (error) {
            res.status(500).message({ message: error.message })
        }
    }
}

module.exports = adoptionController