import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

// import usersRoute from './routes/usersRoute.js'
import config from './config.js'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import cartRoute from './routes/cartRoute.js'
import shopRoute from './routes/shopRoute.js'
import productRoute from './routes/productRoute.js'

const port = 4000;
const app = express();

mongoose.set('strictQuery', true);

// MongoDB Connection
// dbuser:dbpassword@dblink/dbname
mongoose.connect(`mongodb+srv://${config.DBUSER}:${config.DBPASSWORD}@${config.DBHOST}/${config.DBNAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = mongoose.connection
db.on("error", console.error.bind(console, "Connection error!"))
db.once("open", () => console.log("We are connected to the cloud!"))

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', authRoute)
app.use('/user', userRoute)
app.use('/order', orderRoute)
app.use('/cart', cartRoute)
app.use('/shop', shopRoute)
app.use('/product', productRoute)


app.listen(port, () => console.log(`Server is running at port ${port}!`))