const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")
const cors = require('cors')

/* dotenv stores our database's secret key we are just calling it instead of hardcoding it in here. */
dotenv.config()

mongoose
.connect(process.env.MONGO_URL)
.then(()=> console.log("DBConnection Sucessful!"))
.catch((err)=> {
    console.log(err)
})

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)
app.use('/api/orders', orderRoute)
app.use('/api/checkout', stripeRoute)

app.listen(process.env.PORT || 5000, () => {console.log('Backend server is running!')})