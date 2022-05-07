require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//connectDB
const connectDB = require('./main/db/connect')
const authenticateUser = require('./main/middleware/authentication')

const authRouter = require('./main/routes/auth')
const jobsRouter = require('./main/routes/jobs')


// error handler
const notFoundMiddleware = require('./main/middleware/not-found');
const errorHandlerMiddleware = require('./main/middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)




app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8888;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
