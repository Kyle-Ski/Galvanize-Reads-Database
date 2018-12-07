const reformatAuthors = (books) => {
    const reformatted = [];
    const authorsById = {};
  
    books.forEach((author) => {
      if (authorsById[author.author_id]) {
        authorsById[author.author_id].books.push({
          book_id: author.book_id,
          title: author.title,
          genre: author.genre,
          description: author.description,
          coverURL: author.coverURL
        });
      } else {
        authorsById[author.author_id] = {
          author_id: author.author_id,
          firstName: author.firstName,
          lastName: author.lastName,
          biography: author.biography,
          imageURL: author.imageURL,
          books: [{
            book_id: author.book_id,
            title: author.title,
            genre: author.genre,
            description: author.description,
            coverURL: author.coverURL
          }]
        };
        reformatted.push(authorsById[author.author_id]);
      };
    });
    return reformatted;
}

module.exports = {
    reformatAuthors
}