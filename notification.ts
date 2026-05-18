interface Notifiable {
	notify(memberId: string, event: string, title: string): void;
	getChannel(): string;
}

abstract class BaseNotifier implements Notifiable {
	constructor(protected channelName: string) {}

	getChannel(): string {
		return this.channelName;
	}

	formatMessage(event: "reservation" | "overdue", title: string): string {
		if (event === "reservation") {
			return `Your reservation for ${title} is confirmed.`;
		}

		return `Reminder: ${title} is overdue.`;
	}

	abstract send(memberId: string, message: string): void;

	notify(
		memberId: string,
		event: "reservation" | "overdue",
		title: string,
	): void {
		const message = this.formatMessage(event, title);
		this.send(memberId, message);
	}
}

export class EmailNotifier extends BaseNotifier {
	send(memberId: string, message: string): void {
		console.log(`Sending email to #${memberId}: ${message}`);
	}
}

export class SMSNotifier extends BaseNotifier {
	send(memberId: string, message: string): void {
		console.log(`Sending SMS to #${memberId}: ${message}`);
	}
}

export class NotificationService {
	constructor(public channels: Notifiable[]) {}

	dispatch(memberId: string, event: "reservation" | "overdue", title: string) {
		this.channels.forEach((channel) => {
			channel.notify(memberId, event, title);
		});
	}
}

const notificationService = new NotificationService([
	new SMSNotifier("ch1"),
	new EmailNotifier("ch2"),
]);
notificationService.dispatch("123", "reservation", "Dune");
