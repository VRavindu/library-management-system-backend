import express from "express";
import User from "../model/User";
import {saveUser} from "../database/user.data.store";

const router = express.Router();

router.post('/signup', async (req, res) => {
    const user: User = req.body as User;
    try {
        const savedUser = await saveUser(user);
        res.status(201).json(savedUser);
    } catch (error) {
        console.log("Error saving user: ", error);
        res.status(500).send("Error saving user");
    }
});

export default router;