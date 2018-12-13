const knex = require('../db/connection')
const reformat = require('../db/reformatBooks')
const reformatAuthors = require('../db/reformatAuthors')
const getBooks = (req, res, next) => {
    return knex('book')
        .select(
            'book.id as book_id',
            'book.title as title',
            'book.genre',
            'book.description',
            'book.coverURL',
            'author.id as author_id',
            'author.firstName',
            'author.lastName',
            'author.biography',
            'author.imageURL'
        )
        .join('book_authors', 'book_authors.book_id', 'book.id')
        .join('author', 'author.id', 'book_authors.author_id')
        .then(books => {
            const reformatted = reformat.reformatBooks(books)
            res.json({books: reformatted})
        })
        .catch(err => console.error(err))
}

const getAuthors = (req, res, next) => {
    return knex('book')
        .select(
            'book.id as book_id',
            'book.title as title',
            'book.genre',
            'book.description',
            'book.coverURL',
            'author.id as author_id',
            'author.firstName',
            'author.lastName',
            'author.biography',
            'author.imageURL'
        )
        .join('book_authors', 'book_authors.book_id', 'book.id')
        .join('author', 'author.id', 'book_authors.author_id')
        .then(authors => {
            const reformatted = reformatAuthors.reformatAuthors(authors)
            res.json({authors: reformatted})
        })
        .catch(err => console.error(err))
}

const getAll = (req, res, next) => {
    return knex('book_authors')
        .orderBy('id', 'asc')
        .then(books => res.json({ books }))
        .catch(err => console.error("Error:", err))
    } 
    
const postBook = (req, res, next) => {
    const body = req.body
    if(!body.author_id || !body.book_id ){
        res.status(400).json({error: 'Please make sure the author and book are in the database'})
    } else {
        if (body.author_id.length > 1){
            body.author_id.map((author, i) => {
                return knex('book_authors')
                    .insert([{author_id: author, book_id: body.book_id}])
                    .returning('*')
                    .then((book_authors) => {
                        console.log(book_authors[0])
                        //can insert multiple authors, can't res.json
                        res.json({ new: book_authors[0] })
                        // return book_authors.map(({item}) => console.log("item:",item)/*res.json({ item })*/)
                    })
                    .catch(err => console.error(err))
            })
        }
        // res.json({ new: book_authors[0] })
        // return knex('book_authors')
        //     .insert(body)
        //     .returning('*')
        //     .then(book_authors => res.json({ new: book_authors[0]}))
        //     .catch(err => console.error(err))
    }
}
// const editBook = (req, res, next) => {
//     return 
// }
// const deleteBook = (req, res, next) => {
//     return 
// }

module.exports = {
    getBooks,
    getAuthors,
    getAll,
    postBook,
    //editBook,
    //deleteBook
}