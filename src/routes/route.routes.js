const express = require('express')
const router = express.Router()

const Route = require('../models/route.model')() // note we need to call the model caching function

const CrudController = require('../controllers/crud')

const routeCrudController = new CrudController(Route)


// create glitch
router.post('/', routeCrudController.create)

// get all glitches
router.get('/', routeCrudController.getAll)

// get glitch
router.get('/:id', routeCrudController.getOne)

// update glitch
router.put('/:id', routeCrudController.update)

// remove glitch
router.delete('/:id', routeCrudController.delete)

module.exports = router
