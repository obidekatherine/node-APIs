const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {

    const products = await Product.find({})
    .sort('name')
    .select('name price')
    .limit(4)
    .skip(1)//skip the first product on the list
    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields} = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }

    if (company) {
        queryObject.company = company
    }

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    let result = Product.find(queryObject)

    //sorting products
    if(sort){
        const sortList = sort.split(',').join('')
        result = result.sort(sortList)
    }
    else{
        //sorting products based on when the products was created
        result = result.sort('creatAt')
    }
  //searching for products based on what you want to see
    if(fields){
        const fieldList = fields.split(',').join('')
        result = result.select(fieldList)  
    }
    //pagination -- how the page is going to divide(next, prev etc)
    //any page searched for would be listed first
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit;

    result = result.skip(skip).limit(limit)


    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}