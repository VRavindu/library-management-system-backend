class Book {
    id!: number;
    title!: string;
    author!: string;
    isbn!: string;
    publishedYear!: number;
    genre!: string;
    quantity!: number;
    available!: number;
    description!: string;
    imagePath?: string;
}

export default Book;
