const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const serverless = require('serverless-http')

const authRouter = require("../../controllers/auth")
const categoriesRouter = require("../../controllers/categories")
const transactionRouter = require("../../controllers/transactions")
const budgetRouter = require("../../controllers/budget")

require('dotenv/config')

// ! -- Variables
const app = express()


// ! -- Middleware
app.use(cors({ origin: process.env.FRONT_END_URL }))
app.use(express.json());
app.use(morgan('dev'));




app.get('/', (req, res) => {
    res.send("Index view.")
});


//Controller
app.use("/auth", authRouter)
app.use("/category", categoriesRouter)
app.use("/transactions", transactionRouter)
app.use("/budget", budgetRouter)

// Start the Express server
const startServers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connection established");

    } catch (error) {
        console.log(error);
    }
}
startServers();

module.exports.handler = serverless(app)
