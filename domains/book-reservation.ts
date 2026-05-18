type Status = "reserved" | "returned" | "cancelled";

export class BookReservation {
	#status: Status;

	constructor(
		public memberName: string,
		public bookTitle: string,
	) {
		this.#status = "reserved";
	}

	markReturned() {
		if (this.#status === "returned" || this.#status === "cancelled") {
			throw new Error(`${this.bookTitle} is already returned or cancelled.`);
		}

		this.#status = "returned";
	}

	cancel() {
		if (this.#status === "returned") {
			throw new Error(`${this.bookTitle} is already returned.`);
		}

		this.#status = "cancelled";
	}

	getReservationStatus(): Status {
		return this.#status;
	}
}
const book = new BookReservation("John Doe", "Dune");
console.log(book.getReservationStatus());
console.log(book.markReturned());
console.log(book.getReservationStatus());
console.log(book.cancel());
console.log(book.markReturned());
