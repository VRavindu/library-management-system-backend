import express from "express";
import {Member} from "../model/Member";
import {saveMember} from "../database/member-data-store";

const router =  express.Router();

router.post('/save', async (req, res) => {
    const member = req.body as Member;
    try {
        const savedMember = await saveMember(member);
        res.status(201).send(savedMember);
    } catch (error) {
        console.log("Error saving member: ", error);
        res.status(500).send("Error saving member");
    }
})

export default router;