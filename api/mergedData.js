// for merged promises
import { getSingleBook, deleteBook } from './bookData';
import { getAuthorBooks, getSingleAuthor, deleteSingleAuthor } from './authorData';

// TODO: Get data for viewBook
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE BOOK
  getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
    getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
  // GET AUTHOR
  // Create an object that has book data and an object named authorObject
});

// FIXME: Get data for viewAuthor
const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE AUTHOR
  getSingleAuthor(firebaseKey).then((authorObject) => {
    getAuthorBooks(authorObject.firebaseKey)
      .then((bookObject) => resolve({ ...authorObject, bookObject }));
  }).catch(reject);
});

// TODO: Use Promise.all() to delete the author when books are deleted
const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

// TODO: Use Promise.all() to delete books when the author is deleted
const deleteBooksAuthorRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((booksAuthorArray) => {
    const deleteAuthorPromises = booksAuthorArray.map((author) => deleteSingleAuthor(author.firebaseKey));

    Promise.all(deleteAuthorPromises).then(() => {
      deleteBook(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export {
  getBookDetails, getAuthorDetails, deleteAuthorBooksRelationship, deleteBooksAuthorRelationship
};
