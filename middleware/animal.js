const Animals = require('../models/animalModel')

const getAnimal = async (req, res, next) => {
    const animal = await Animals.findById(req.params.id)

    if (!animal) 
        return res.status(400).json({ message: "Animal not found" })
    
    req.animal = animal

    next()
}

module.exports = getAnimal