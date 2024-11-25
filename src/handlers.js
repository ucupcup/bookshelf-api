const { nanoid } = require('nanoid');
const books = require('./books');
const errorCodes = require('./errorCodes');

const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;
    
    if (!name) {
        const error = errorCodes.VALIDATION.MISSING_NAME;
        return h.response({
            status: 'fail',
            code: error.code,
            message: error.message,
        }).code(400);
    }

    if (readPage > pageCount) {
        const error = errorCodes.VALIDATION.READPAGE_EXCEEDS_PAGECOUNT;
        return h.response({
            status: 'fail',
            code: error.code,
            message: error.message,
        }).code(400);   
    }

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updateAt = createdAt;
    const finished = pageCount === readPage;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, createdAt, updateAt
    };

    books.push(newBook);

    return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
    }).code(201);
};

const getAllBooksHandler = (request, h) => {
    const simplifiedBooks = books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));

    return h.response({
        status: 'success',
        data: {
            books: simplifiedBooks,
        },
    }).code(200);
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.find((b) => b.id === bookId) [0];

    if (!book) {
        const error = errorCodes.BOOK.NOT_FOUND;
        return h.response({
            status: 'fail',
            code: error.code,
            message: error.message,
        }).code(404);
    }

    return h.response({
        status: 'success',
        data: {
            book,
        },
    }).code(200);
};

// const getBookByIdHandler = (req, h) => {
//     const { id } = req.params;
  
//     const book = books.filter((n) => n.id === id) [0];
  
//     if (book !== undefined) {
//       return {
//         status: 'success',
//         data: {
//           note,
//         },
//       };
//     }

//     const error = errorCodes.BOOK.NOT_FOUND;
//     const response = h.response({
//         status: 'fail',
//         code: error.code,
//         message: error.message,
//     });
  
//     response.code(404);
//     return response;
//   };

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler };