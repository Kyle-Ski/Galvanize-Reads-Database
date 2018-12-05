const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3222
const cors = require('cors')
const bookRoutes = require('./routes/bookRoutes')
const authorRoutes = require('./routes/authorRoutes')
const book_authorsRoutes = require('./routes/book_authorsRoutes')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res, next) => {
    process.env.NODE_ENV !== 'production' ?
    res.json({
        message: 'What\'s up? Welcome to the Reads database!',
        books: `http://localhost:${port}/books`,
        authors: `http://localhost:${port}/authors`,
        book_authors: `http://localhost:${port}/book_authors`
    }) :
    res.json({
        message: 'What\'s up? Welcome to the Reads database!',
        books: `https://galvanize-reads-ski.herokuapp.com/books`,
        authors: `https://galvanize-reads-ski.herokuapp.com/authors`,
        book_authors: `https://galvanize-reads-ski.herokuapp.com/book_authors`
    })
})

app.use('/books', bookRoutes)
app.use('/authors', authorRoutes)
app.use('/book_authors', book_authorsRoutes)

app.use(notFound);
app.use(errorHandler);

function notFound(err, req, res, next) {
    res.status(404).send({error: 'Not found!', status: 404, url: req.originalUrl})
}

function errorHandler(err, req, res, next) {
    console.error('NOPE, LOL', err)
    const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
    res.status(500).send({error: err.message, stack, url: req.originalUrl})
}


app.listen(port, () => {
    process.env.NODE_ENV !== 'production' ?
    console.log(`I got you on http://localhost:${port}`) :
    console.log(`I got you on https://galvanize-reads-ski.herokuapp.com/`)
})