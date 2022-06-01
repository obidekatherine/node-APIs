const Product = require('../models/Product')
const {StatusCode} = require('http-status-codes')

const createProduct = async (req,res) => {
    //res.send('Create product')
    console.log(req.body);
    const product = await Product.create(req.body)
    res.StatusCode(StatusCode.CREATED).json({product})
}

const getAllProducts = async(req, res) => {
    res.send('List of products')
}

module.exports = {
    createProduct,getAllProducts
}