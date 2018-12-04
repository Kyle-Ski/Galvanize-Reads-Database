
exports.up = function(knex, Promise) {
    return knex.schema.createTable('book_authors', function (table) {
        table.increments()
        table.integer('author_id').references('author.id').unsigned().onDelete('cascade')
        table.integer('book_id').references('book.id').unsigned().onDelete('cascade')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('book_authors')
};
