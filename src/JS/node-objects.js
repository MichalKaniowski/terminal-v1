export { createNodeObject, createNodeObjectFromString };

function createNodeObject(kindOfObject="span", className="", text="") {
    const nodeObject = document.createElement(kindOfObject);
    if (className !== "") {
        nodeObject.className = className;
    }
    if (text !== "") {
        nodeObject.innerText = text;
    }

    return nodeObject;
}

//words that are between ** are treated like commands and words between '' are treated as intructions
function createNodeObjectFromString(string) {
    const arrayOfCommands = [];
    const arrayOfInstructions = [];

    let firstAstricsIndex, secondAstricsIndex;
    let firstIntructionCharacterIndex, secondInstructionCharacterIndex;

    for (let i=0; i<string.length; i++) {
        if (string[i] === "*") {
            firstAstricsIndex = i;
            let command = "";
            for (let j=i+1; j<string.length; j++) {
                if (string[j] === "*") {
                    secondAstricsIndex = j;
                    arrayOfCommands.push(command);
                    i=j;
                    break;
                } else {
                    command += string[j];
                }
            }
        }

        if (string[i] === "'") {
            firstIntructionCharacterIndex = i;
            let intruction = "";
            for (let j=i+1; j<string.length; j++) {
                if (string[j] === "'") {
                    secondInstructionCharacterIndex = j;
                    arrayOfInstructions.push(intruction);
                    i=j;
                    break;
                } else {
                    intruction += string[j];
                }
            }
        }
    }

    const div = document.createElement("div");

    if (arrayOfCommands.length === arrayOfInstructions.length) {
        arrayOfCommands.forEach((command, index) => {
            const lineContainer = createNodeObject("p", "line-container", "");
            const commandSpan = createNodeObject("span", "command-span command-span-long", command);
            const intructionSpan = createNodeObject("span", "instruction", arrayOfInstructions[index]);
            lineContainer.append(commandSpan, intructionSpan);
            div.appendChild(lineContainer);
        });
    } else { //it means that there are one instruction or command
        if (string.includes("*")) {
            const firstSpan = createNodeObject("span", "", string.slice(0, firstAstricsIndex))
            const command = createNodeObject("span", "command-span", string.slice(firstAstricsIndex+1, secondAstricsIndex));
            const secondSpan = createNodeObject("span", "", string.slice(secondAstricsIndex+1));

            div.append(firstSpan, command, secondSpan);
        } else {
            const firstSpan = createNodeObject("span", "", string.slice(0, firstIntructionCharacterIndex));
            const intruction = createNodeObject("span", "instruction", string.slice(firstIntructionCharacterIndex+1, secondInstructionCharacterIndex));
            const secondSpan = createNodeObject("span", "", string.slice(secondInstructionCharacterIndex+1));

            div.append(firstSpan, intruction, secondSpan);
        }
    }

    return div;
}