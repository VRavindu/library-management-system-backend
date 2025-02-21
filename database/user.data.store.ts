import { PrismaClient } from '@prisma/client';
import User from "../model/User";
import user from "../model/User";

const prisma = new PrismaClient();

export async function saveUser(user: User) {
    try {
        return await prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: user.password
            }
        });
    } catch (error) {
        console.log(`Error Saving User : ${error}`);
        throw error;
    }
}

export async function getUserByEmail(email: string) {
    try {
        return await prisma.user.findUnique({
            where: {
                email: email
            }
        });
    } catch (error) {
        console.log(`Error Getting User : ${error}`);
        throw error;
    }
}

export async function updateUser(email: string, user: User) {
    try {
        return await prisma.user.update({
            where: {
                email: email
            },
            data: {
                username: user.username,
                password: user.password
            }
        });
    } catch (error) {
        console.log(`Error Updating User : ${error}`);
        throw error;
    }
}