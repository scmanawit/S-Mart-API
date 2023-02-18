import { Router } from 'express'
import orderController from '../controllers/orderController.js';
import { authenticated, user } from '../middlewares/auth.js';

const orderRoute = Router();

orderRoute.get("/history", [authenticated, user], orderController.orderHistory);

export default orderRoute;