
exports.up = function(knex, Promise) {
    return knex.schema.createTable('book', function (table) {
        table.increments()
        table.string('title')
        table.string('genre')
        table.string('description', 500)
        table.string('coverURL', 270)
        table.string('authors')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('book')
};
