const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDb = require('./config/connectDb')

//CONFIG DOT ENV 
dotenv.config();

//connect mongodb
connectDb();


//rest object 
const app = express();


//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routes
//user routes
app.use('/api/v1/users', require('./routes/userRoute'));

//transection routes
app.use('/api/v1/transections', require('./routes/transectionRoutes'))


//port 
const PORT = 8080 || process.env.PORT


//listen server
app.listen(PORT, ()=>{
    console.log(`server is working on port ${PORT}`)
})