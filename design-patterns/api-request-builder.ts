class RequestBuilder {
	url: string;
	options: RequestInit = {};
	searchParams: URLSearchParams;

	constructor(url: string) {
		this.url = url;
	}

	setMethod(method: Request["method"]) {
		this.options.method = method;

		return this;
	}

	setBody(body: Record<string, unknown>) {
		this.options.body = JSON.stringify(body);

		return this;
	}

	setHeaders(headers: Record<string, unknown>) {
		this.options.headers = Object.fromEntries(
			Object.entries(headers).map(([key, value]) => [key, String(value)]),
		);

		return this;
	}

	setSearchParams(params: Record<string, string>) {
		this.searchParams = new URLSearchParams(params);
		return this;
	}

	build() {
		if (!this.url) {
			throw new Error("No url provided");
		}

		if (this.options.method === "POST" && !this.options.body) {
			throw new Error("Should include body");
		}

		const url = new URL(this.url);

		if (this.searchParams) {
			for (const [key, value] of this.searchParams) {
				url.searchParams.set(key, value);
			}
		}

		return new Request(url.toString(), this.options);
	}
}

const request = new RequestBuilder("http://some-url.com")
	.setMethod("POST")
	.setBody({ title: "Title", content: "Content" })
	.setHeaders({
		"x-auth-token": 123,
	})
	.setSearchParams({
		query: "something",
	})
	.build();

console.log(request);
