const express = require('express')
const router = express.Router()

const User = require('../models/user.model')() // note we need to call the model caching function

const CrudController = require('../controllers/crud')

const UserCrudController = new CrudController(User)
const userController = require('../controllers/user.controller')


// create a user
router.post('/', UserCrudController.create)

// get all users
router.get('/', UserCrudController.getAll)

// get a user
router.get('/:id', UserCrudController.getOne)

// update a user
router.put('/:id', UserCrudController.update)

// remove a user
router.delete('/:id', UserCrudController.delete)

router.post('/:id/follow', userController.follow)

module.exports = router