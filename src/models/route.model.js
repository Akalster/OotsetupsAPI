const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const getModel = require('./model_cache')

const StepSchema = require('./step.model').Schema;

// define the product schema
const RouteSchema = new Schema({
    title: {
        type: String,
        required: [true, 'A route needs a title.']
    },
    description: {
        type: String,
        required: [true, 'A route needs a description.']
    },
    publishDate: {
        type: Date,
        required: [true, 'A route needs a date.'],
        validate: {
            validator: (publishDate) => publishDate <= new Date(),
            message: 'A route cannot be made in the future.'
        }
    },
    steps: {
        type: [StepSchema],
        default: []
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'A user needs to be attached to a route.'],
        ref: 'user'
    }
});

// export the route model through a caching function
module.exports = getModel('Route', RouteSchema)