const reformatBooks = (books) => {
    const reformatted = []
    const bookById = {}

    books.forEach(book => {
        const currentBookId = book.book_id

        if(bookById[currentBookId]){
            bookById[[book.book_id]].authors.push({
                author_id: book.author_id,
                firstName: book.firstName,
                lastName: book.lastName,
                // biography: book.biography
            })
        } else {
            bookById[currentBookId] = {
                id: book.book_id,
                title: book.title,
                genre: book.genre,
                description: book.description,
                coverURL: book.coverURL,
                authors: [{
                    author_id: book.author_id,
                    firstName: book.firstName,
                    lastName: book.lastName,
                    // biography: book.biography,
                    // imageURL: book.imageURL
                }]
            }
            reformatted.push(bookById[currentBookId])
        }
    })
    return reformatted
}

module.exports = {
    reformatBooks
}