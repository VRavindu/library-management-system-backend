import { PrismaClient } from '@prisma/client';
import User from "../model/User";

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