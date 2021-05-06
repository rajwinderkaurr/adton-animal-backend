const router = require('express').Router()
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const adoptionController = require('../controllers/adoptionController')

router.route('/adoption')
    .get(adoptionController.getAdoptions)
    .post(auth, adoptionController.createAdoptions)

router.route('/adoption/:id')
    .put(auth, adminAuth, adoptionController.changeAdoption)
    .delete(auth, adoptionController.deleteAdoptions)

module.exports = router