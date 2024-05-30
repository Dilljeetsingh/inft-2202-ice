import { getAnimal, deleteAnimal, findAnimal } from "./animal.service.js";

const messageBox = document.querySelector("#empty-message");
const animalTable = document.querySelector("#animal-list");
const elebody = animalTable.querySelector('tbody');

const animalList = getAnimal();
drawAnimalTable(animalList);

function drawAnimalTable(animals) {
    const tbody = animalTable.querySelector('tbody');
    tbody.innerHTML = ''; 

    if (!animals || animals.length == 0) {
        messageBox.classList.remove("d-none");
        animalTable.classList.add("d-none");
    } else {
        messageBox.classList.add("d-none");
        animalTable.classList.remove("d-none");

        animals.forEach(animal => {
            let newRow = tbody.insertRow();

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
            
            let deleteButton = document.createElement("button");
            deleteButton.classList.add("btn", "btn-danger", "my-1", "mx-1");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                if (deleteAnimal(animal.name)) {
                    drawAnimalTable(getAnimal());
                    console.log(`Animal ${animal.name} deleted successfully`);
                } else {
                    console.log(`Failed to delete animal ${animal.name}`);
                }
            });

            newCell8.appendChild(deleteButton);

            let editLink = document.createElement("a");
            editLink.classList.add("btn", "btn-primary", "my-1", "mx-1");
            editLink.textContent = "Edit";
            editLink.href = `add.html?name=${animal.name}`;

            newCell8.appendChild(editLink);
        });
    }
}
