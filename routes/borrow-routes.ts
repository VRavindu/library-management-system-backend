import express from "express";
import {borrowBook} from "../database/borrow-data-store";

const router = express.Router();

router.post('/', async (req, res) => {
    const { memberId, bookId } = req.body;
    try {
        const result = await borrowBook(memberId, bookId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});

export default router;