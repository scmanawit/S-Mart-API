import { Router } from 'express'
import { admin, authenticated, user } from '../middlewares/auth.js'
import shopController from '../controllers/shopController.js'
import { verify } from '../middlewares/shop.js';

const shopRoute = Router();

// create new shop
shopRoute.post('/register', [authenticated, user], shopController.createShop)

// verify shop
shopRoute.put('/verify/:shopId', [authenticated, admin], shopController.verifyShop)

// view specific shop
shopRoute.get('/:shopId', verify, shopController.viewMyShop)

// update my shop
shopRoute.put('/update/:shopId', [authenticated, user], shopController.updateMyShop)


export default shopRoute