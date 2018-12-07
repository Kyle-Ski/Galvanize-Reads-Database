const express = require('express')
const router = express.Router()
const controller = require('../controllers/book_authorController')

router.get('/books', controller.getBooks)
router.get('/authors', controller.getAuthors)

module.exports = router