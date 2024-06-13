console.log('hello world');

// Get references to the message box, animal table, tbody, and spinner
const messageBox = document.querySelector("#empty-message");
const animalTable = document.querySelector("#animal-list");
const tbody = animalTable.querySelector('tbody');
const spinner = document.querySelector("#spinner");

// Function to draw the animal table
function drawAnimalTable(animals) {
    tbody.innerHTML = ''; 

    if (!animals || animals.length === 0) {
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
        });
    }
    spinner.classList.add("d-none");
}

// Function to fetch animals using XMLHttpRequest
function xhrAnimals() {
    const req = new XMLHttpRequest();
    req.addEventListener("load", function() {
        const data = JSON.parse(req.responseText);
        drawAnimalTable(data);
        
    });
    req.open("GET", "./data/animals.json");
    req.send();
}

// Function to fetch animals using fetch with promises
function fetchAnimalsPromise() {
    const url = new URL('./data/animals.json', window.location.href);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        drawAnimalTable(data);
    })
    .catch(error => {
        console.log(error);
    });
}

// Function to fetch animals using fetch with async/await
async function fetchAnimalsAsync() {
    try {
        const url = new URL('./data/animals.json', window.location.href);
        const response = await fetch(url);
        const data = await response.json();
        drawAnimalTable(data);
    } catch (error) {
        console.log(error);
    }
}
// Hide the spinner and table initially
spinner.classList.remove("d-none");
animalTable.classList.add("d-none");
messageBox.classList.add("d-none");



// Call the fetch function (only one should be uncommented at a time)
// xhrAnimals();
// fetchAnimalsPromise();
fetchAnimalsAsync();
