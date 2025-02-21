import { PrismaClient } from "@prisma/client";

const prisma= new PrismaClient();

export async function borrowBook(memberId: number, bookId: number) {
    const member = await prisma.member.findUnique({
        where: {
            id: memberId
        }
    });
    if (!member || member.borrowedBooksCount >= 2) {
        throw new Error("Member not found or Member has already borrowed 2 books");
    }
    const book = await prisma.book.findUnique({
        where: {
            id: bookId
        }
    });
    if (!book || book.available < 1) {
        throw new Error("Book is not Available");
    }
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    await prisma.borrow.create({
        data: {
            memberId,
            bookId,
            dueDate
        }
    });

    await prisma.book.update({
        where: {
            id: bookId
        },
        data: {
            available: book.available - 1
        }
    });

    await prisma.member.update({
        where: {
            id: memberId
        },
        data: {
            borrowedBooksCount: member.borrowedBooksCount + 1
        }
    });
    return {message: "Book Borrowed Successfully", dueDate};
}