import { Router } from 'express'
import productController from '../controllers/productController.js'
import { admin, authenticated, user } from '../middlewares/auth.js'
import { verify } from '../middlewares/shop.js'
import { correctProduct } from '../middlewares/product.js'

const productRoute = Router()

// add products
productRoute.post('/:shopId/', [authenticated, user, verify], productController.addProduct )

// view all active products
productRoute.get('/', productController.viewActiveProducts )

// view a product
productRoute.get('/:productId', correctProduct , productController.viewProduct)

// update Product
productRoute.put('/:productId', [authenticated, user], productController.updateProduct)

// archive Product
productRoute.delete('/:productId', [authenticated, user], productController.archiveProduct)


export default productRoute