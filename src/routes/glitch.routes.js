const express = require('express')
const router = express.Router()

const Glitch = require('../models/glitch.model')() // note we need to call the model caching function

const CrudController = require('../controllers/crud')

const glitchCrudController = new CrudController(Glitch)


// create glitch
router.post('/', glitchCrudController.create)

// get all glitches
router.get('/', glitchCrudController.getAll)

// get glitch
router.get('/:id', glitchCrudController.getOne)

// update glitch
router.put('/:id', glitchCrudController.update)

// remove glitch
router.delete('/:id', glitchCrudController.delete)

module.exports = router
