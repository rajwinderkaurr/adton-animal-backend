const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/refresh_token', userController.refreshToken)
router.get('/infor', userController.getUser)

module.exports = router