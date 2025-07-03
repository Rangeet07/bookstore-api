const express = require('express');
const auth = require('../middleware/auth');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const BOOKS_FILE = path.join(__dirname, '../data/books.json');
// const USERS_FILE = path.join(__dirname, '../data/users.json');

// async function readUsers() {
//   const data = await fs.readFile(USERS_FILE, 'utf-8');
//   return JSON.parse(data);
// }

async function readBooks() {
  const data = await fs.readFile(BOOKS_FILE, 'utf-8');
  return JSON.parse(data);
}

async function writeBooks(books) {
  await fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2));
}

// validation of book input function
function validateBookInput(data) {
  const { title, author, genre, publishedYear } = data;

  if (
    typeof title !== 'string' ||
    typeof author !== 'string' ||
    typeof genre !== 'string' ||
    typeof publishedYear !== 'number'
  ) {
    return false;
  }

  return true;
}

router.get('/', auth, async (req, res) => {
  const books = await readBooks();
  res.json(books);
});

router.get('/:id', auth, async (req, res) => {
  const books = await readBooks();
  const book = books.find(b => b.id === req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

router.post('/', auth, async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;

  
  if (!validateBookInput(req.body)) {
    return res.status(400).json({
      error: 'Invalid book data. title, author, and genre must be strings. publishedYear must be a number.'
    });
  }

  const books = await readBooks();
  
  const newBook = {  id: uuidv4(), title, author, genre, publishedYear, userId: req.user.username };
  books.push(newBook);
  await writeBooks(books);
  res.status(201).json(newBook);
});

router.put('/:id', auth, async (req, res) => {
  const books = await readBooks();
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

//     if (books.userId !== req.user.username) {
//     return res.status(403).json({ error: 'You can only update your own books' });
//   }


//   books[index] = { ...books[index], ...req.body };
  const book = books[index];

  // Check ownership
  if (book.userId !== req.user.username) {
    return res.status(403).json({ error: 'You can only update your own books' });
  }

  const { title, author, genre, publishedYear } = req.body;

 // Validate only if fields are provided
  if (
    (title && typeof title !== 'string') ||
    (author && typeof author !== 'string') ||
    (genre && typeof genre !== 'string') ||
    (publishedYear && typeof publishedYear !== 'number')
  ) {
    return res.status(400).json({
      error: 'Invalid book data. title, author, and genre must be strings. publishedYear must be a number.'
    });
  }

  if (title) book.title = title;
  if (author) book.author = author;
    if (genre) book.genre = genre;
      if (publishedYear) book.publishedYear = publishedYear;


  books[index] = book;
  await writeBooks(books);
  res.json(books[index]);
});

router.delete('/:id', auth, async (req, res) => {
  const books = await readBooks();
  const book = books.find(b => b.id === req.params.id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  //  Check if the logged-in user is the owner
  if (book.userId !== req.user.username) {
    return res.status(403).json({ error: 'You can only delete your own books' });
  }

  const updatedBooks = books.filter(b => b.id !== req.params.id);
  await writeBooks(updatedBooks);
  res.json({ message: 'Book deleted successfully' });
});

module.exports = router;
