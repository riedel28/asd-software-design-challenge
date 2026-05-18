export interface BookRecord {
	id: number;
	title: string;
	author_name: string;
	is_available: boolean;
	added_at: Date;
}

const db = {
	get(query: string) {
		return [];
	},
};

export class BookRepository {
	async getAllBooks(): Promise<BookRecord[]> {
		const books = await db.get("SELECT * FROM books");

		return books as BookRecord[];
	}
}
