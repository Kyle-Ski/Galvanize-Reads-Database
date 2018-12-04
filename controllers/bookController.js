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
    getOne,
    //postBook,
    //editBook,
    //deleteBook
}