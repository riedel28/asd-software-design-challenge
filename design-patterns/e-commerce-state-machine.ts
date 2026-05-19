type OrderState = "Draft" | "Paid" | "Shipped" | "Delivered" | "Cancelled";
type OrderEvent =
	| "checkout"
	| "payment_received"
	| "dispatch"
	| "confirm_delivery"
	| "cancel";

const transitions: Record<
	OrderState,
	Partial<Record<OrderEvent, OrderState>>
> = {
	Draft: {
		checkout: "Paid",
		cancel: "Cancelled",
	},
	Paid: {
		dispatch: "Shipped",
		cancel: "Cancelled",
	},
	Shipped: {
		confirm_delivery: "Delivered",
	},
	Delivered: {},
	Cancelled: {},
};

export class Order {
	private state: OrderState = "Draft";

	getState(): OrderState {
		return this.state;
	}

	private transition(event: OrderEvent) {
		const next = transitions[this.state][event];

		if (!next) {
			throw new Error(
				`Illegal transition: event "${event}" from state "${this.state}"`,
			);
		}

		this.state = next;
	}

	checkout() {
		this.transition("checkout");
	}

	paymentReceived() {
		this.transition("payment_received");
	}

	dispatch() {
		this.transition("dispatch");
	}

	confirmDelivery() {
		this.transition("confirm_delivery");
	}

	cancel() {
		this.transition("cancel");
	}
}

const order = new Order();
console.log(order.getState());
order.checkout();
console.log(order.getState());
order.dispatch();
console.log(order.getState());
order.confirmDelivery();
console.log(order.getState());
