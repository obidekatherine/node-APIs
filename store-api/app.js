require('dotenv').config()
// async errors
require('express-async-errors')

const express = require('express');
const app = express();
const connectDB = require('./main/db/connect')
const productsRouter = require('./main/routes/products')

//middlewares
const notFoundMiddleware = require('./main/middleware/not-found')
const errorMiddleware = require('./main/middleware/error-handler')

//express middleware
app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products',productsRouter )

//products route
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Sever is listening on port ${port}.........`))
    } catch (error) {
        console.log(error);
    }
}

start()