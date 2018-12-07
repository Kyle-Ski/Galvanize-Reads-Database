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
// const getOne = (req, res, next) => {
//     const id = req.params.id
//     if(!Number(id)){
//         res.status(404).json({error: 'Please enter a valid id'})
//     } else {
//         return knex('book_authors')
//             .select('*')
//             .where('id', id)
//             .then(book => {
//                 if(!book.length){
//                     res.status(404).json({error: 'That book doesn\'t exist yet'})
//                 } else {
//                     return res.json({book})
//                 }
//             })
//             .catch(err => console.error("Error:", err))
//     }
// }
// const postBook = (req, res, next) => {
//     return 
// }
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
    //postBook,
    //editBook,
    //deleteBook
}