const router = require('express').Router()
const categoryController = require('../controllers/categoryController')
const verifyCategory = require('../middleware/categories')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const categoryMiddleware = require('../middleware/categories')

router.route('/categories')
    .get(categoryController.getCategories)
    .post(auth, adminAuth, categoryController.createCategory)
router.route('/categories/:id')
    .put(categoryMiddleware, categoryController.updateCategories)
    .delete(categoryMiddleware, categoryController.deleteCategories)


module.exports = router