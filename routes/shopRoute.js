import { Router } from 'express'
import { admin, authenticated, user } from '../middlewares/auth.js'
import shopController from '../controllers/shopController.js'
import { verify } from '../middlewares/shop.js';

const shopRoute = Router();

// create new shop
shopRoute.post('/register', [authenticated, user], shopController.create)

// verify shop
shopRoute.put('/verify/:shopId', [authenticated, admin], shopController.verify)

// view specific shop
shopRoute.get('/:shopId', [verify], shopController.view)

// update my shop
shopRoute.put('/update/:shopId', [authenticated, user, verify], shopController.update)

// delete my shop
shopRoute.delete('/delete/:shopId', [authenticated, user, verify], shopController.deactivate)

// ban a shop
shopRoute.delete('/admin/delete/:shopId', [authenticated, admin, verify], shopController.banShop)

export default shopRoute