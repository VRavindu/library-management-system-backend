import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function returnBook(bookId: number, memberId: number) {
    const borrowRecord = await prisma.borrow.findFirst({
        where: {
            bookId: bookId,
            memberId: memberId
        }
    });
    if (!borrowRecord) {
        throw new Error("No borrow record found for the member and book");
    }
    await prisma.borrow.delete({
        where: {
            id: borrowRecord.id
        }
    });
    const book = await prisma.book.findUnique({
        where: {
            id: bookId
        }
    })
    await prisma.book.update({
        where: {
            id: bookId
        },
        data: {
            available: (book?.available ?? 0) + 1
        }
    });
    const member = await prisma.member.findUnique({
        where: {
            id: memberId
        }
    });
    await prisma.member.update({
        where: {
            id: memberId
        },
        data: {
            borrowedBooksCount: (member?.borrowedBooksCount ?? 1) - 1
        }
    });
    return {
        message: "Book returned successfully"
    }
}