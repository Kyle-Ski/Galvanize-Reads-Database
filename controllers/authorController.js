const knex = require('../db/connection')

const getAll = (req, res, next) => {
    return knex('author')
        .orderBy('id', 'asc')
        .then(authors => res.json({authors}))
        .catch(err => console.error("Error:", err))
}
const getOne = (req, res, next) => {
    const id = req.params.id
    if(!Number(id)){
        res.status(404).json({error: 'Please enter a valid id'})
    } else {
        return knex('author')
            .select('*')
            .where('id', id)
            .then(author => {
                if(!author.length){
                    res.status(404).json({error: 'That author doesn\'t exist yet'})
                } else {
                    return res.json({author})
                }
            })
            .catch(err => console.error("Error:", err))
    }
}
// const postAuthor = (req, res, next) => {
//     return 
// }
// const editAuthor = (req, res, next) => {
//     return 
// }
// const deleteAuthor = (req, res, next) => {
//     return 
// }

module.exports = {
    getAll,
    getOne,
    //postAuthor,
    //editAuthor,
    //deleteAuthor
}