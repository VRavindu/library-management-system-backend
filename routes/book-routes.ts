import express from "express";
import path from "path";
import multer from "multer";
import Book from "../model/Book";
import { deleteBook, getAllBooks, getBookById, saveBook, updateBook } from "../database/book-data-store";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/books'); // Save files in the 'uploads/books' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/save', upload.single('image'), async (req, res) => {
    const book: Book = req.body as Book;
    const imagePath = req.file?.path; 

    try {
        const savedBook = await saveBook(book, imagePath);
        res.status(201).json(savedBook);
    } catch (error) {
        console.log("Error saving book: ", error);
        res.status(500).send("Error saving book");
    }
});

router.put('/update/:bookId', upload.single('image'), async (req, res) => {
    const bookId = req.params.bookId;
    console.log('Book ID:', bookId);
    const book: Book = req.body as Book;
    const imagePath = req.file?.path;

    try {
        const updatedBook = await updateBook(bookId, book, imagePath);
        res.status(200).json(updatedBook);
    } catch (error) {
        console.log("Error updating book: ", error);
        res.status(500).send("Error updating book");
    }
});

router.delete('/delete/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    try {
        const deletedBook = await deleteBook(bookId);
        res.status(200).json(deletedBook);
    } catch (error) {
        console.log("Error deleting book: ", error);
    }
});

router.get('/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    try {
        const book = await getBookById(bookId);
        res.status(200).json(book);
    } catch (error) {
        console.log("Error getting book: ", error);
        res.status(500).send("Error getting book");
    }
});

router.get('/', async (req, res) => {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        console.log("Error getting books: ", error);
        res.status(500).send("Error getting books");
    }
});

export default router;
