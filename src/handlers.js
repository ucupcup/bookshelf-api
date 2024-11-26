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
    reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    const error = errorCodes.VALIDATION.MISSING_NAME;
    return h.response({
      status: "fail",
      message: error.message,
    }).code(400);
  }

  if (readPage > pageCount) {
    const error = errorCodes.VALIDATION.READPAGE_EXCEEDS_PAGECOUNT;
    return h.response({
      status: "fail",
      message: error.message,
    }).code(400);
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    }).code(201);
  }

  const error = errorCodes.BOOK.FAILED_ADD;
  return h.response({
    status: "error",
    message: error.message,
  }).code(500);
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let dataBooks = books;

  if (name !== undefined) {
    dataBooks = dataBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    dataBooks = dataBooks.filter((book) => Number(book.reading) === Number(reading));
  }

  if (finished !== undefined) {
    dataBooks = dataBooks.filter((book) => Number(book.finished) === Number(finished));
  }

  return h.response({
    status: "success",
    data: {
      books: dataBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  }).code(200);
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((b) => b.id === bookId)[0];

  if (book !== undefined) {
    return h.response({
      status: "success",
      data: {
        book,
      },
    }).code(200);
  }

  const error = errorCodes.BOOK.NOT_FOUND;
  return h.response({
    status: "fail",
    message: error.message,
  }).code(404);
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const finished = pageCount === readPage;
  const index = books.findIndex((book) => book.id === bookId);

  if (!name) {
    const error = errorCodes.BOOK.FAILED_UPDATE_NOT_FOUND;
    return h.response({
      status: "fail",
      message: error.message,
    }).code(400);
  }

  if (readPage > pageCount) {
    const error = errorCodes.VALIDATION.READPAGE_CANNOT_BE_GREATER;
    return h.response({
      status: "fail",
      message: error.message,
    }).code(400);
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    return h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    }).code(200);
  }

  const error = errorCodes.BOOK.FAILED_UPDATE_ID_NOT_FOUND;
  return h.response({
    status: "fail",
    message: error.message,
  }).code(404);
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);

    return h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    }).code(200);
  }

  const error = errorCodes.BOOK.FAILED_DELETE_NOT_FOUND;
  return h.response({
    status: "fail",
    message: error.message,
  }).code(404);
};

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };