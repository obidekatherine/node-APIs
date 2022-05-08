const { StatusCodes } = require('http-status-codes')

//making mongoose error readable
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    //set default
    statusCode: err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'Something went wrong, try again'
  }



if(err.name === 'ValidationError'){
  customError.msg = Object.values(err.errors).map((item)=>item.message).join(' and ')
  customError.statusCode = 400
}

if(err.name === 'CastError'){
  customError.msg = `No item found with id : ${err.value}`
  customError.statusCode = 404
}


if(err.code && err.code === 11000){
  customError.msg = `${Object.keys(err.keyValue)} already exist`
  customError.statusCode = 400
}

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
