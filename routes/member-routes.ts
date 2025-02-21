import express from "express";
import {Member} from "../model/Member";
import {deleteMember, saveMember, updateMember} from "../database/member-data-store";

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
});

router.put('/update/:id', async (req, res) => {
    const memberId = req.params.id;
    const member = req.body as Member;
    try {
        const updatedMember = await updateMember(memberId, member);
        res.status(200).send(updatedMember);
    } catch (error) {
        console.log("Error updating member: ", error);
        res.status(500).send("Error updating member");
    }
});

router.delete('/delete/:id', async (req, res) => {
    const memberId = req.params.id;
    try {
        const deletedMember = await deleteMember(memberId);
        res.status(200).send(deletedMember);
    } catch (error) {
        console.log("Error deleting member: ", error);
        res.status(500).send("Error deleting member");
    }
});

export default router;