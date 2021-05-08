const router = require('express').Router()
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const animalController = require('../controllers/animalController')
const getAnimal = require('../middleware/animal')

router.route('/animals')
    .get(animalController.getAnimals) // Get all animals
    .post(auth, adminAuth, animalController.createAnimal) // Create New Animal

router.route('/animals/same_category_id/:id')
    .get(animalController.getWithSameCategoryId)

router.route('/animals/same_category_name/')
    .get(animalController.getWithSameCategoryName)

router.route('/animals/single/:id')
    .get(animalController.getSingleAnimal)
    .put(auth, adminAuth, getAnimal, animalController.updateAnimal) // Update Animal by ID
    .delete(auth, adminAuth, getAnimal, animalController.deleteAnimal) // Delete Animal by ID

module.exports = router