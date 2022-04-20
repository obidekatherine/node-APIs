const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({ //only the properties that is set here will be pass on DB
    name: {         //validators
        type: String,
        required: [true, 'Provide a name'],
        trim: true,
        maxlength: [100, 'name cannot be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('Task', TaskSchema)