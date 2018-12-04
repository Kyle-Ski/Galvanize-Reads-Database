const knex = require('../db/connection')

const getAll = (req, res, next) => {
    return knex('book')
        .orderBy('id', 'asc')
        .then(books => res.json({books}))
}
// const getOne = (req, res, next) => {
//     return 
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
    //getOne,
    //postBook,
    //editBook,
    //deleteBook
}