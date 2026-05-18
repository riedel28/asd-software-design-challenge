import type { BookRepository } from "../repositories/book.repository";

interface Book {
	id: number;
	title: string;
	authorName: string;
	addedAt: Date;
}

export class BookService {
	constructor(private readonly bookRepository: BookRepository) {}

	async getAvailableBooks(): Promise<Book[]> {
		const books = await this.bookRepository.getAllBooks();

		return books
			.filter((book) => book.is_available)
			.map((book) => {
				return {
					id: book.id,
					title: book.title,
					authorName: book.author_name,
					addedAt: book.added_at,
				};
			});
	}
}
