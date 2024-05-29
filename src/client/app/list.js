import { getAnimal } from "./animal.service.js";

const messageBox = document.querySelector("#empty-message");
const animalTable = document.querySelector("#animal-list");
const animalList = getAnimal();

if (!animalList || animalList.length == 0) {
    messageBox.classList.remove("d-none");
} else {
    messageBox.classList.add("d-none");
    drawAnimalTable(animalList);
    animalTable.classList.remove("d-none");
}

function drawAnimalTable(animals) {
    animals.forEach(animal => {
        let newRow = animalTable.insertRow();

        let newCell1 = newRow.insertCell();
        newCell1.textContent = animal.name;

        let newCell2 = newRow.insertCell();
        newCell2.textContent = animal.species;

        let newCell3 = newRow.insertCell();
        newCell3.textContent = animal.breed;

        let newCell4 = newRow.insertCell();
        newCell4.textContent = animal.age;

        let newCell5 = newRow.insertCell();
        newCell5.textContent = animal.legs;

        let newCell6 = newRow.insertCell();
        newCell6.textContent = animal.eyes;

        let newCell7 = newRow.insertCell();
        newCell7.textContent = animal.sound;

        let newCell8 = newRow.insertCell();
        
        let newButton = document.createElement("button");

        newButton.classList.add("btn", "btn-primary", "my-1","mx-1");
        newButton.textContent = "Delete";

        newButton.addEventListener("click", (event) => {

        });

        newCell8.appendChild(newButton);

        let editLink = document.createElement("a");
        editLink.classList.add("btn", "btn-primary", "my-1","mx-1");
        editLink.textContent = "Edit";
        editLink.href = '../client/add.html'

        newCell8.appendChild(editLink);
        
    });
}

