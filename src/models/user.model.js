const mongoose = require('mongoose')
const Schema = mongoose.Schema

const getModel = require('./model_cache')

const UserSchema = new Schema({
    // a user needs to have a name
    name: {
        type: String,
        required: [true, 'A user needs to have a name.'],
        unique: [true, 'A user needs to have a unique name'],
    },

    password: {
        type: String,
        required: [true, 'A user needs to have a password.'],
    },

    email: {
        type: String,
        required: [true, 'A user needs to have a email.'],
        pattern: "/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/"
    },

    birthDate: {
        type: Date,
        required: [true, 'A user needs a birthdate.'],
        validate: {
            validator: (birthDate) => birthDate <= new Date(),
            message: 'A user cannot be made in the future.'
        }
    },

    // a list of users this user followed is kept
    followed: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: [],
        autopopulate: true,
    }]
})

// mongoose plugin to always populate fields
UserSchema.plugin(require('mongoose-autopopulate'));

// when a user is deleted all their reviews need to be deleted
// note: use an anonymous function and not a fat arrow function here!
// otherwise 'this' does not refer to the correct object
// use 'next' to indicate that mongoose can go to the next middleware
UserSchema.pre('remove', function(next) {
    // include the product model here to avoid cyclic inclusion
    const Glitch = mongoose.model('Glitch')
    const Step = mongoose.model('Step')
    const Route = mongoose.model('Route')

    // don't iterate here! we want to use mongo operators!
    // this makes sure the code executes inside mongo
    Route.deleteMany({}, {$pull: {'routes': {'user': this._id}}})
        .then(() => next())

    Step.deleteMany({}, {$pull: {'steps': {'user': this._id}}})
        .then(() => next())

    Glitch.deleteMany({}, {$pull: {'glitches': {'user': this._id}}})
        .then(() => next())
})

// export the user model through a caching function
module.exports = getModel('User', UserSchema)