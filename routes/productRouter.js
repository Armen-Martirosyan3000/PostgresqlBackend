const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/', authMiddleware, productController.create)
router.get('/', authMiddleware, productController.getAll)
router.get('/:id', authMiddleware, productController.getOne)
router.put('/:id', authMiddleware, productController.update)
router.delete('/:id', authMiddleware, productController.delete)


module.exports = router