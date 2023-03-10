import { Router } from 'express'
import productController from '../controllers/productController.js'
import { admin, authenticated, user } from '../middlewares/auth.js'
import { verifyShop } from '../middlewares/shop.js'
import { verifyProduct } from '../middlewares/product.js'

const productRoute = Router()

// add products
productRoute.post('/:shopId/', [authenticated, user, verifyShop], productController.addProduct)

// view all active products
productRoute.get('/', productController.viewActiveProducts)

// view all products categories
productRoute.get('/categories', productController.getProductCategories)

// view a product
productRoute.get('/:productId', [verifyProduct], productController.viewProduct)

// update Product
productRoute.put('/:productId', [authenticated, user, verifyProduct], productController.updateProduct)

// archive Product
productRoute.delete('/:productId', [authenticated, verifyProduct], productController.archiveProduct)

// unarchive a product
productRoute.put('/activate/:productId', [authenticated, user, verifyProduct], productController.activateProduct)

export default productRoute