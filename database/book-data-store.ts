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