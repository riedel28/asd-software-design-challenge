function getMockDB() {
	return {
		query(select: string): Log[] {
			return [
				{
					message: "Message",
					timestamp: "123",
					level: "123",
				},
			];
		},
	};
}

type Format = "json" | "csv" | "xml";
type Log = { timestamp: string; message: string; level: string };

interface LogRepository {
	getLogs(): Promise<Log[]>;
}

class MongoLogRepository implements LogRepository {
	private readonly db: ReturnType<typeof getMockDB>;

	constructor(db: ReturnType<typeof getMockDB>) {
		this.db = db;
	}

	async getLogs(): Promise<Log[]> {
		const logs = await this.db.query("SELECT * FROM system_logs");
		return logs;
	}
}

class JSONExporter {
	export(logs: Log[]) {
		return JSON.stringify(logs);
	}
}
class CSVExporter {
	export(logs: Log[]) {
		return logs.map((l) => `${l.timestamp},${l.level},${l.message}`).join("\n");
	}
}
class XMLExporter {
	export(logs: Log[]) {
		return `<logs>${logs.map((l) => `<log>${l.message}</log>`).join("")}</logs>`;
	}
}

class ExporterFactory {
	createExporter(format: Format) {
		if (format === "json") {
			return new JSONExporter();
		} else if (format === "csv") {
			return new CSVExporter();
		} else if (format === "xml") {
			return new XMLExporter();
		} else {
			throw new Error("Unknown format");
		}
	}
}

class LogExporter {
	private readonly logRepository: MongoLogRepository;
	private readonly exporterFactory: ExporterFactory;

	constructor(
		logRepository: MongoLogRepository,
		exporterFactory: ExporterFactory,
	) {
		this.logRepository = logRepository;
		this.exporterFactory = exporterFactory;
	}

	async exportLogs(format: Format) {
		const logs = await this.logRepository.getLogs();
		const exporter = this.exporterFactory.createExporter(format);

		exporter.export(logs);
	}
}

console.log(
	new LogExporter(new MongoLogRepository(getMockDB()), new ExporterFactory()),
);
