import { decode } from "../helpers/auth.js";
import { getOrderBy } from "../helpers/order.js";

const cart = async (request, response) => {
    try {
        const userData = decode(request.headers.authorization);
        const myCart = await getOrderBy({ userId: userData._id, status: 'pending' })
        return response.send(myCart);
    } catch (error) {
        // console.log(error);
        return response.send(500, "There was an error! Please try again!")
    }

}

export default {
    cart
}
