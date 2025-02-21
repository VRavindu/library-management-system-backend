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

export async function updateMember(memberId: string, member: Member) {
    try {
        return await prisma.member.update({
            where: {
                id: parseInt(memberId)
            },
            data: {
                name: member.mem_name,
                email: member.mem_email,
                phoneNumber: member.phoneNumber,
                membershipStartDate: member.membershipStartDate,
                status: member.status,
            }
        });
    } catch (error) {
        console.log("Error updating member: ", error);
        throw error;
    }
}

export async function deleteMember(memberId: string) {
    try {
        return await prisma.member.delete({
            where: {
                id: parseInt(memberId)
            }
        });
    } catch (error) {
        console.log("Error deleting member: ", error);
        throw error;
    }
}

export async function getMemberById(memberId: string) {
    try {
        return await prisma.member.findUnique({
            where: {
                id: parseInt(memberId)
            }
        });
    } catch (error) {
        console.log("Error getting member by id: ", error);
        throw error;
    }
}