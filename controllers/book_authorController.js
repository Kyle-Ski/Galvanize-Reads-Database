const knex = require('../db/connection')

const getAll = (req, res, next) => {
    return knex('book')
        .select('author.name')
        .innerJoin('book_authors', 'book.id', 'book_authors.book_id')
        .innerJoin('author', 'author.id', 'book_author.author_id')
        .orderBy('book.id', 'asc')
        .then(book_authors => res.json({book_authors: book_authors}))
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
    getAll,
    // getOne,
    //postBook,
    //editBook,
    //deleteBook
}