const express = require('express')
const router = express.Router()

const Step = require('../models/step.model')() // note we need to call the model caching function

const CrudController = require('../controllers/crud')

const stepCrudController = new CrudController(Step)


// create glitch
router.post('/', stepCrudController.create)

// get all glitches
router.get('/', stepCrudController.getAll)

// get glitch
router.get('/:id', stepCrudController.getOne)

// update glitch
router.put('/:id', stepCrudController.update)

// remove glitch
router.delete('/:id', stepCrudController.delete)

module.exports = router
