const input = document.getElementById("input") as HTMLInputElement;
const undoBtn = document.getElementById("undo") as HTMLButtonElement;
const redoBtn = document.getElementById("redo") as HTMLButtonElement;

const undoStack: string[] = [];
const redoStack: string[] = [];

if (undoStack.length === 0) {
	undoBtn.setAttribute("disabled", "true");
}

if (redoStack.length === 0) {
	redoBtn.setAttribute("disabled", "true");
}

function renderStacks() {
	const undoOutput = document.getElementById("undoOutput") as HTMLDivElement;
	const redoOutput = document.getElementById("redoOutput") as HTMLDivElement;

	undoOutput.innerHTML = JSON.stringify(undoStack, null, 2);
	redoOutput.innerHTML = JSON.stringify(redoStack, null, 2);
}

function changeButtonState(btn: HTMLButtonElement, stack: string[]) {
	if (stack.length === 0) {
		btn.setAttribute("disabled", "true");
	} else {
		btn.removeAttribute("disabled");
	}
}

function updateUI() {
	changeButtonState(undoBtn, undoStack);
	changeButtonState(redoBtn, redoStack);

	renderStacks();
}

input.addEventListener("input", (e) => {
	const value = (e.target as HTMLInputElement).value;
	undoStack.push(value);

	updateUI();
});

undoBtn.addEventListener("click", () => {
	const last = undoStack.pop();

	if (last) {
		redoStack.push(last);
		input.value = last;
	}

	updateUI();
});

redoBtn.addEventListener("click", () => {
	const last = redoStack.pop();

	if (last) {
		undoStack.push(last);
		input.value = last;
	}

	updateUI();
});
