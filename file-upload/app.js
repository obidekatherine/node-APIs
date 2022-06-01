require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// database
const connectDB = require('./main/db/connect');

//routers
const productRouter = require('./main/routes/productRoutes')

// error handler
const notFoundMiddleware = require('./main/middleware/not-found');
const errorHandlerMiddleware = require('./main/middleware/error-handler');

app.use(express.json())//built in middleware from express to access to all data in req.body

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

app.use('/api/v1/products', productRouter)

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
