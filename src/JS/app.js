import { clearTerminal, executeCommand, commandHistory } from "./utils.js";

const commandForm = document.querySelector(".command-line");
const commandInput = document.querySelector("#command-input");
let indexOfPreviousCommand = -1;

commandForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const command = commandInput.value;
    executeCommand(command);
    indexOfPreviousCommand++;
});

document.addEventListener("keydown", (e) => {
    if (e.key === "l") {
        if (e.ctrlKey) {
            e.preventDefault();
            clearTerminal();
        }
    }

    if (e.key === "ArrowUp") {
        e.preventDefault();
        if (indexOfPreviousCommand >= 0) {
            commandInput.value = commandHistory[indexOfPreviousCommand];
            indexOfPreviousCommand--;
        }
    }

    if (e.key === "ArrowDown") {
        e.preventDefault();
        if (indexOfPreviousCommand+1 >= 0) {
            if (commandHistory[indexOfPreviousCommand+2] !== undefined) {
                commandInput.value = commandHistory[indexOfPreviousCommand+2];
                indexOfPreviousCommand++;
            }
        }
    }
});