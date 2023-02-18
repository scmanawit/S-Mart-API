import { decode } from "../helpers/auth.js";
import { getOrdersBy } from "../helpers/order.js";

const orderHistory = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization)
        const myOrders = await getOrdersBy({ userId: userData._id, status: 'completed' })
        return response.send(myOrders);
    } catch (error) {
        // console.log(error);
        return response.send(500, "Server Error!")
    }

}

export default {
    orderHistory
}
