const knex = require('../db/connection')

const getAll = (req, res, next) => {
    return knex('book')
        .orderBy('id', 'asc')
        .then(books => res.json({books}))
        .catch(err => console.error("Error:", err))
}

const getOne = (req, res, next) => {
    const id = req.params.id
    if(!Number(id)){
        res.status(404).json({error: 'Please enter a valid id'})
    } else {
        return knex('book')
            .select('*')
            .where('id', id)
            .then(book => {
                if(!book.length){
                    res.status(404).json({error: 'That book doesn\'t exist yet'})
                } else {
                    return res.json({book})
                }
            })
            .catch(err => console.error("Error:", err))
    }
}
const postBook = (req, res, next) => {
    const body = req.body
    if(!body.title || !body.genre || ! body.description || !body.coverURL){
        res.status(400).json({error: "Please fill out all parts of the form to add a book."})
    } else {
        return knex('book')
            .insert(body)
            .returning('*')
            .then(book => res.json({book: book[0]}))
            .catch(err => console.error("Error:", err))
    }
}
// const editBook = (req, res, next) => {
//     return 
// }
const deleteBook = (req, res, next) => {
    const id = req.params.id
    if(!Number(id)){
        res.status(404).json({error: 'Please enter a valid id'})
    } else {
        return knex('book')
            .where('id', id)
            .then(book => {
                if(!book.length){
                    return res.status(404).json({error: 'Please enter a valid id'})
                } else {
                    return book
                }
            })
            .delete()
            .returning('*')
            .then(book =>res.json({deleted: book[0]}))
    }
}

module.exports = {
    getAll,
    getOne,
    postBook,
    //editBook,
    deleteBook
}