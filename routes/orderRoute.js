import { Router } from 'express'
import orderController from '../controllers/orderController.js';
import { authenticated, user } from '../middlewares/auth.js';
import { verifyProduct } from '../middlewares/product.js';

const orderRoute = Router();

// Order History
orderRoute.get("/history", [authenticated, user], orderController.orderHistory);

// clear cart
orderRoute.put('/clearCart', [authenticated, user ], orderController. clearCart)

// Add to cart
orderRoute.post('/addToCart/:productId', [authenticated, user, verifyProduct], orderController.addToCart)

// remove product from cart
orderRoute.put('/delete/:productId', [authenticated, user, verifyProduct], orderController.removeProduct)

// change product quantity
orderRoute.put('/changeQuantity/:productId', [authenticated, user, verifyProduct], orderController.changeQuantity)

// order checkout
orderRoute.put('/checkOut', [authenticated, user], orderController.orderCheckout)


export default orderRoute;