import { PrismaClient } from "@prisma/client";
import {Member} from "../model/Member";

const prisma = new PrismaClient();

export async function saveMember(member: Member) {
    try {
        return await prisma.member.create({
            data: {
                name: member.mem_name,
                email: member.mem_email,
                phoneNumber: member.phoneNumber,
                membershipStartDate: member.membershipStartDate,
                status: member.status,
            }
        });
    } catch (error) {
        console.log("Error saving member: ", error);
        throw error;
    }
}