import { PrismaClient } from "@prisma/client";
import Book from "../model/Book";

const prisma = new PrismaClient();

export async function saveBook(book: Book) {
    try {
        return await prisma.book.create({
          data: {
              title: book.title,
              author: book.author,
              isbn: book.isbn,
              publishedYear: book.publishedYear,
              genre: book.genre,
              quantity: book.quantity,
              available: book.available,
              description: book.description
          }
        });
    } catch (error) {
        console.log("Error saving book: ", error);
        throw error;
    }
}

export async function updateBook(bookId: string, book: Book) {
    try {
        return await prisma.book.update({
            where: {
                id: parseInt(bookId)
            },
            data: {
                title: book.title,
                author: book.author,
                isbn: book.isbn,
                publishedYear: book.publishedYear,
                genre: book.genre,
                quantity: book.quantity,
                available: book.available,
                description: book.description
            }
        });
    } catch (error) {
        console.log("Error updating book: ", error);
        throw error;
    }
}

export async function deleteBook(bookId: string) {
    try {
        return await prisma.book.delete({
            where: {
                id: parseInt(bookId)
            }
        });
    } catch (error) {
        console.log("Error deleting book: ", error);
        throw error;
    }
}

export async function getBookById(bookId: string) {
    try {
        return await prisma.book.findUnique({
            where: {
                id: parseInt(bookId)
            }
        });
    } catch (error) {
        console.log("Error getting book by id: ", error);
        throw error;
    }
}

export async function getAllBooks() {
    try {
        return await prisma.book.findMany();
    } catch (error) {
        console.log("Error getting all books: ", error);
        throw error;
    }
}