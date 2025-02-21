import express from "express";
import Book from "../model/Book";
import {deleteBook, saveBook, updateBook} from "../database/book-data-store";

const router = express.Router();

router.post('/save', async (req, res) => {
    const book: Book = req.body as Book;
    try {
        const savedBook = await saveBook(book);
        res.status(201).json(savedBook);
    } catch (error) {
        console.log("Error saving book: ", error);
        res.status(500).send("Error saving book");
    }
});

router.put('/update/:bookId', async (req, res) => {
    const bookId = req.params.bookId;
    const book: Book = req.body as Book;
    try {
        const updatedBook = await updateBook(bookId, book);
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

export default router;