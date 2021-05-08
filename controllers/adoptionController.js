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
            res.status(500).json({ message: error.message })
        }
    },
    getSingleAdoption: async (req, res) => {
        try {
            adoption = await Adoptions.findById(req.params.id)

            res.json(adoption)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    createAdoptions: async (req, res) => {
        try {
            const { animalId, userMessage } = req.body
            const { id: requesterId } = req.user

            // Check if animal ID is correct and animal exists
            const isAnimal = (animalId.length === 24 && await Animals.exists({_id: animalId}))
            if (!isAnimal) return res.status(400).json({ message: "Please provide the correct animal id" })
            
            // Check if is staff member
            if (req.user.role === 1) return res.status(400).json({ message: "Admins can not adopt animals" })
            // Check if animal is already adopted
            if (await Adoptions.exists({ animalId, status: 1 })) return res.status(400).send({ message: "Sorry, animal is already adopted" })
            // Check for duplicate requests
            if (await Adoptions.exists({ requesterId, animalId })) return res.status(400).send({ message: "You cannot adopt an animal twice" })

            const adoption = new Adoptions({ animalId, requesterId, userMessage })
            const newAdoption = await adoption.save()

            res.json({ newAdoption })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    changeAdoption: async (req, res) => {
        try {
            const { id }  = req.params // Adoption ID
            const { status, allowerMessage } = req.body // Either Allow, pending or reject 
            const { id: allowerId } = req.user

            // Check if adoption exists
            const isAdoption = (id.length === 24 && await Adoptions.exists({_id: id}))
            if (!isAdoption || ![0, 1, 2].includes(status)) return res.status(400).json({ message: "Please provide the correct adoptionId or status" })

            // Update Adoption
            await Adoptions.findByIdAndUpdate(id, { allowerId, status, allowerMessage }, { useFindAndModify: false })

            res.json({ message: "Adoption status changed" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    deleteAdoptions: async (req, res) => {
        try {
            const { id } = req.params

            // Check Authorization
            const isValid = !!(await Adoptions.findOne({ _id: id, requesterId: req.user.id })) || req.user.role === 1
            if (!isValid) return res.status(400).json({ message: "Not authorized to delete this adoption." })

            await Adoptions.findByIdAndDelete(id)
            res.json({ message: "Successfully deleted" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = adoptionController