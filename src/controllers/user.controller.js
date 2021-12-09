const User = require('../models/user.model')() // note we need to call the model caching function

const neo = require('../../neo')

const errors = require('../errors')

async function follow(req, res) {
    // check whether request is valid
    if(!req.body.user) {
        throw new errors.EntityNotFoundError('User is required to follow a user')
    }

    // get the product from the db and check whether we have such a product
    const user = await User.findById(req.params.id)
    if(!user) {
        throw new errors.EntityNotFoundError(`User with id '${req.params.id}' not found`)
    }

    // add the product to the bought list of the user
    const user2 = await User.findOne({name: req.body.user})

    // maybe not necessary any more now that we store it in neo?
    // BEWARE: atomicity issues!
    user2.followed.push(user._id)
    await user2.save()

    // open a neo session
    const session = neo.session()

    // store the follow in neo
    await session.run(neo.follow, {
        userId: user._id.toString(),
        user2Id: user2._id.toString(),
    })

    // close the neo session
    session.close()

    res.status(201).end()
}

module.exports = {
    follow,
}