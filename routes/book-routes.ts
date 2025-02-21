import express from "express";
import Book from "../model/Book";
import {saveBook} from "../database/book-data-store";

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

export default router;