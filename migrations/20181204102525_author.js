
exports.up = function(knex, Promise) {
    return knex.schema.createTable('author', function (table) {
        table.increments()
        table.string('firstName')
        table.string('lastName')
        table.string('biography', 850)
        table.string('imageURL', 270) 
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('author')
};
