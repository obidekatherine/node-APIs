require('dotenv').config()
const connectDB = require('./main/db/connect')
const Product = require('./main/models/product')
const jsonProducts = require('./products.json')


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log('Success!!');
        //setting up exit to terminate the app once its success
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()