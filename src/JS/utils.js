import commands from "../../commands.json" assert {type: "json"};
import { createNodeObject, createNodeObjectFromString } from "./node-objects.js";
export { getWeather, clearTerminal, executeCommand, commandHistory };

const instructionsContainer = document.querySelector(".instructions");
const previousCommandsContainer = document.querySelector(".previous-commands");
const commandLabelText = document.querySelector("#command-label").innerText;
const commandInput = document.querySelector("#command-input");

const commandHistory = [];

async function getWeather(city, units="metric") {
    const APP_ID = "b96d384a316eb4e0c365721a9dec0e4c"
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}&units=${units}`;

    const response = await fetch(API_URL);
    if (response.ok) {
        const weatherData = await response.json();
        const weatherTemp = await weatherData.main.temp;
        const weatherDescription = await weatherData.weather[0].description;

        return {temp: weatherTemp, description: weatherDescription};
    } else {
        return `${city} does not exist. Make sure you spelled the name of the city correctly.`;
    }
}

function clearTerminal() {
    document.querySelector(".banner").style.display = "none";
    instructionsContainer.style.display = "none";
    previousCommandsContainer.innerHTML = "";
}

function executeCommand(command) {
    commandInput.value = "";
    let date = new Date()

    if (command !== "") {
        commandHistory.push(command);
    }

    const dirpath = createNodeObject("span", "dir-name", commandLabelText);
    const previousCommand = createNodeObject("span", "command-text", command);
    const commandResponse = createNodeObject("div", "command-response", "");

    switch(command.trim()) {
        case "clear":
            clearTerminal();
            break;
        case "help":
            commandResponse.appendChild(createNodeObjectFromString(commands.help));
            break;
        case "aboutme":
            commandResponse.innerHTML = `<br/> ${commands.aboutme}`;
            break;
        case "github":
            const githubLink = createNodeObject("a", "link", commands.githubURL);
            githubLink.href = commands.githubURL;
            githubLink.target = "_blank";
            commandResponse.appendChild(githubLink);
            break;
        case "projects":
            commandResponse.innerText = commands.projects;
            break;
        case "resume":
            commandResponse.innerText = commands.resume;
            break;
        case "email":
        case "mail":
            const mailLink = createNodeObject("a", "link", "here");
            mailLink.href = "mailto:kaniowskimichal2@gmail.com";
            commandResponse.innerText = commands.email;
            commandResponse.appendChild(mailLink);
            break;
        case "weather":
            commandResponse.innerText = commands.weather;
            break;
        case "date":
            commandResponse.innerText = date;
            break;
        case "time":
            commandResponse.innerText = date.getHours() + ":" + date.getMinutes();
            break;
        case "history":
            commandResponse.innerText = "\n" + commandHistory.join("\n");
            break;
        case "":
            break;
        default:
            if (command.trim().split(" ").length === 2 && command.trim().split(" ")[0] === "weather") {
                const country = command.trim().split(" ")[1];
                const weather = Promise.resolve(getWeather(country));
                weather.then(value => {
                    if (value.temp) {
                        commandResponse.innerText = "" + value.description + ", " + value.temp + "°C, ";
                    } else {
                        commandResponse.innerText = value;
                    }
                });
            } else {
                commandResponse.appendChild(createNodeObjectFromString(commands.commandNotFound));
            }
            break;
    }

    const responseContainer = createNodeObject("p", "response-container", "");
    responseContainer.append(dirpath, previousCommand, commandResponse);

    if (command !== "clear") {
        previousCommandsContainer.appendChild(responseContainer);
    }
}