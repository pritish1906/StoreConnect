const express = require('express')
const app = express()
const mongoose = require('mongoose')


const dotenv = require('dotenv')
dotenv.config()


const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const cartRoute = require('./routes/cart')

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("DB connected")
})
.catch((err) => {
    console.log(err)
})
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("server running perfectly")
})