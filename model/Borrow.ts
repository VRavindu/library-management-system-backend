export class Borrow {
    id!: number;
    bookId!: number;
    memberId!: number;
    borrowDate!: Date;
    returnDate?: Date | null;
    dueDate!: Date;
}