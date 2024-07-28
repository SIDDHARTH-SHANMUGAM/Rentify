const express = require('express')
require('dotenv').config()
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// constructing port
app.listen(process.env.PORT, ()=> {
    console.log('server is running')
})

// body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db connection
const connectDb = require('./DBConfig/dbConnect');
connectDb();


// routers
const userRouter = require('./Routes/UserRoutes')
app.use('/user', userRouter);
const rentRouter = require('./Routes/RentRoutes')
app.use('/rent', rentRouter);