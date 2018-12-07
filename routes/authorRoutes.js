const express = require('express')
const router = express.Router()
const controller = require('../controllers/authorController')

router.get('/', controller.getAll)
router.get('/:id', controller.getOne)
router.post('/', controller.postAuthor)
// router.put('/:id', controller.editAuthor)
// router.delete(':id', controller.deleteAuthor)

module.exports = router