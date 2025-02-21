import express from "express";
import User from "../model/User";
import {getUserByEmail, saveUser} from "../database/user.data.store";

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

router.get('/login/:email', async (req, res) => {
    const email: string = req.params.email;
    try {
        const user = await getUserByEmail(email);
        if (user){
            res.status(200).json(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.log("Error getting user: ", error);
        res.status(500).send("Error getting user");
    }
});

export default router;