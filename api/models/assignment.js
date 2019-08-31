const mongoose = require('mongoose')
const isURL = require('validator/lib/isURL')


const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Assignment Title is required!']
    },
    link: {
        type: String,
        required: [true, 'Project Link is required!'],
        validate: {
            validator: isURL,
            message: `Specified link is not a valid URL!`
        }
    },
    description: {
        type: String,
        required: [true, 'Project Description is required!']
    },
    score: {
        type: Number,
        min: [0, 'You must enter a positive integer value'],
        max: this.maxScore,
        validate: {
            validator: Number.isInteger,
            message: 'You must enter a positive integer value'
        }
    },
    maxScore: {
        type: Number,
        min: [0, 'You must enter a positive integer value'],
        validate: {
            validator: Number.isInteger,
            message: 'You must enter a positive integer value'
        }
    }
})

module.exports = schema