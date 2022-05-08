require('dotenv').config();
require('express-async-errors');

//security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

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


app.set('trust proxy', 1)
app.use(rateLimiter({	windowMs: 15 * 60 * 1000, // 15 minutes
max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())


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
