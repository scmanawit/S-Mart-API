import { Router } from 'express'
import cartController from '../controllers/cartController.js';
import { authenticated, user } from '../middlewares/auth.js';

const cartRoute = Router();

cartRoute.get("/", [authenticated, user], cartController.cart);

export default cartRoute;