const express = require('express')
const app = express()
const tasks = require('./main/routes/tasks')
const connectDB = require('./main/db/connect')
require('dotenv').config()
const notFound = require('./main/middleware/not-found')
const errorHandlerMiddleware = require('./main/middleware/error-handler')


//middleware
app.use(express.static('./main/public'))
app.use(express.json());

//routes

app.use('/api/v1/tasks', tasks)

app.use(notFound)

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000;

const start = async ()=> {
try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
} catch (error) {
    console.log(error);
}
}

start()




/*app.get('/api/v1/tasks')   //-get all the tasks
app.post('/api/v1/tasks')  //-create a new task
app.get('/api/v1/tasks/:id') // - get a single task
app.patch('/api/v1/tasks/:id') //-update a task
app.delete('/api/v1/tasks/:id') //-delete a task*/
