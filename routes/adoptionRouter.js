const router = require('express').Router()
const auth = require('../middleware/auth')
const user = require('../middleware/user')
const adminAuth = require('../middleware/adminAuth')
const adoptionController = require('../controllers/adoptionController')

router.route('/adoption')
    .get(adoptionController.getAdoptions)
    .post(auth, user, adoptionController.createAdoptions)

router.route('/adoption/:id')
    .get(adoptionController.getSingleAdoption)
    .put(auth, adminAuth, adoptionController.changeAdoption)
    .delete(auth, user, adoptionController.deleteAdoptions)

module.exports = router