import express from "express";
import {returnBook} from "../database/return-data-store";

const router = express.Router();

router.post('/', async (req, res) => {
    const { bookId, memberId } = req.body;
    try {
        const response = await returnBook(bookId, memberId);
        res.status(200).json(response);
    } catch (error) {
        res.status(400);
    }
});
export default router;