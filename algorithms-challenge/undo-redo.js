"use strict";
const input = document.getElementById("input");
const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");
const undoStack = [];
const redoStack = [];
if (undoStack.length === 0) {
    undoBtn.setAttribute("disabled", "true");
}
if (redoStack.length === 0) {
    redoBtn.setAttribute("disabled", "true");
}
function renderStacks() {
    const undoOutput = document.getElementById("undoOutput");
    const redoOutput = document.getElementById("redoOutput");
    undoOutput.innerHTML = JSON.stringify(undoStack, null, 2);
    redoOutput.innerHTML = JSON.stringify(redoStack, null, 2);
}
function changeButtonState(btn, stack) {
    if (stack.length === 0) {
        btn.setAttribute("disabled", "true");
    }
    else {
        btn.removeAttribute("disabled");
    }
}
function updateUI() {
    changeButtonState(undoBtn, undoStack);
    changeButtonState(redoBtn, redoStack);
    renderStacks();
}
input.addEventListener("input", (e) => {
    const value = e.target.value;
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
