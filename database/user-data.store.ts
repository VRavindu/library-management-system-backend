import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import User from "../model/User";
const prisma = new PrismaClient();


export async function createUser(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const addedUser = await prisma.user.create({
        data: {
            username: user.username,
            email: user.email,
            password: hashedPassword,
        },
    });

    console.log("User created:", addedUser);
    return addedUser;
}

export async function verifyUserCredentials(identifier: string, password: string): Promise<boolean> {
    const user = await prisma.user.findFirst({
        where: {
            OR: [{ username: identifier }, { email: identifier }],
        },
    });

    if (!user) {
        return false;
    }

    return await bcrypt.compare(password, user.password);
}
