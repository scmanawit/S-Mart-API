import { decode } from "../helpers/auth.js";
import { getOrderBy, getOrdersBy } from "../helpers/order.js";
import { getProductBy } from "../helpers/product.js";
import { getUserBy } from "../helpers/user.js";
import Order from "../models/Order.js";


const orderHistory = async (request, response) => {
    try {
        console.log('jshdgf');
        const userData = decode(request.headers.authorization)
        const myOrders = await getOrdersBy({ user: userData._id, status: 'completed' })
        console.log('myorders', myOrders);
        return response.send(myOrders);
    } catch (error) {
        console.log(error);
        return response.send(500, "Server Error!")
    }

}

const addToCart = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization)

        const productId = request.params.productId
        console.log(userData._id);

        const order = await getOrderBy({ user: userData._id, status: 'pending' })
        console.log('order1', order);

        const product = await getProductBy({ _id: productId })

        let input = request.body
        const orderProduct = order.products.find((p) => (p.product._id.toString() === productId))

        if (!input.quantity) {
            return response.send(422, 'Input quantity is required!')
        }

        if (orderProduct) {
            const additionalTotal = input.quantity * product.price
            orderProduct.quantity = orderProduct.quantity + input.quantity
            orderProduct.subTotal = orderProduct.subTotal + additionalTotal
            order.total = order.total + additionalTotal
            await order.save()
            return response.send(order)
        }

        const subTotal = input.quantity * product.price
        order.total = order.total + subTotal
        order.products.push({ product: product._id, quantity: input.quantity, subTotal: subTotal })
        const newOrder = await (await order.save()).populate('products.product', {createdAt: false, __v: false})
        return response.send(newOrder)
    } catch (error) {
        console.log('ERR', error);
        return response.send(500, "Server Error!")
    }
}

const clearCart = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization);

        const order = await getOrderBy({ user: userData._id, status: 'pending' })

        order.products = []
        order.total = 0

        await order.save()
        return response.send(order)



    } catch (error) {
        console.log(error);
        return response.send(500, "Server Error!")

    }
}

const removeProduct = async (request, response) => {

    try {
        const userData = decode(request.headers.authorization);

        const order = await getOrderBy({ user: userData._id, status: 'pending' })

        const productToRemove = request.params.productId

        let productIndex = null
        const orderProduct = order.products.find((p, index) => {
            if (p.product.toString() === productToRemove) {
                productIndex = index
                return true
            }

            return false
        })
        order.total = order.total - orderProduct.subTotal
        order.products.splice(productIndex, 1)

        const orderSave = await order.save()

        return response.send(orderSave)

    } catch (error) {
        console.log(error);
        return response.send(500, "Server Error!")
    }



}

const changeQuantity = async (request, response) => {
    try {

        const userData = decode(request.headers.authorization);
        let input = request.body
        const order = await getOrderBy({ user: userData._id, status: 'pending' })


        const productIdToUpdate = request.params.productId;

        const product = await getProductBy({ _id: productIdToUpdate })

        let productIndex = null
        const orderProduct = order.products.find((p, index) => {
            if (p.product.toString() === productIdToUpdate) {
                productIndex = index
                return true
            }

            return false
        })
        if (!orderProduct) {
            return response.send('Product does not exist! add the Product to cart')
        }
        order.total = order.total - orderProduct.subTotal

        if (input.quantity <= 0) {
            order.products.splice(productIndex, 1)
            return response.send(await order.save())
        }

        orderProduct.quantity = input.quantity
        orderProduct.subTotal = orderProduct.quantity * product.price
        order.total = order.total + orderProduct.subTotal

        const orderSave = await order.save()

        return response.send(orderSave)


    } catch (error) {
        console.log('err', error);
        return response.send(500, "Server Error!")
    }
}

const orderCheckout = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization);
        let input = request.body
        const order = await getOrderBy({ user: userData._id, status: 'pending' })
        console.log('Order 1', order);

        if (order.products === undefined || order.products.length === 0) {
            return response.send('Your cart is empty!')
        }

        const user = await getUserBy({_id:userData._id})

        if (input.address) {
            user.address = input.address
            await user.save()
        }

        if (!user.address){
            return response.send (422, 'Please enter your address!')
        }

        console.log('Order 2', order);

        order.status = 'completed';
        order.transactionDate = new Date();
        await order.save()


        // // Create new cart after checking out
        let newOrder = new Order({
            user: userData._id,
        });

        await (await newOrder.save()).populate('products.product', {createdAt: false, __v: false})

        return response.send(newOrder)

    } catch (error) {
        console.log(error);
        return response.send(500, "Server Error!")
    }
}

export default {
    orderHistory,
    addToCart,
    clearCart,
    removeProduct,
    changeQuantity,
    orderCheckout
}
