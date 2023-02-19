import { Router } from 'express'
import { admin, authenticated, user } from '../middlewares/auth.js'
import shopController from '../controllers/shopController.js'
import { verifyShop } from '../middlewares/shop.js';

const shopRoute = Router();

// create new shop
shopRoute.post('/register', [authenticated, user], shopController.create)

// verify shop
shopRoute.put('/verify/:shopId', [authenticated, admin], shopController.verify)

// get all shops
shopRoute.get('/all', [authenticated], shopController.getAll)

// view specific shop
shopRoute.get('/:shopId', [verifyShop], shopController.view)

// update my shop
shopRoute.put('/update/:shopId', [authenticated, user, verifyShop], shopController.update)

// delete my shop
shopRoute.delete('/delete/:shopId', [authenticated, user, verifyShop], shopController.deactivate)

// ban a shop
shopRoute.delete('/admin/delete/:shopId', [authenticated, admin, verifyShop], shopController.banShop)

export default shopRoute