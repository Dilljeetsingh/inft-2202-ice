import { getAnimal, deleteAnimal, findAnimal } from "./animal.service.mock.js";

// Get references to the message box, animal table, and pagination
const messageBox = document.querySelector("#empty-message");
const animalTable = document.querySelector("#animal-list");
const tbody = animalTable.querySelector('tbody');
const pagination = document.querySelector(".pagination");

// Get the modal instance and confirm delete button
const exampleModal = new bootstrap.Modal('#exampleModal');
const confirmDeleteButton = document.querySelector('#exampleModal .btn-primary');

const perPage = 5; // Number of entries per page
let currentPage = 1; // Current page number
let currentAnimal = null; // Variable to store the animal to be deleted

// Initial call to populate the table
const animalList = getAnimal();
drawAnimalTable(animalList);

function drawAnimalTable(animals) {
    const tbody = animalTable.querySelector('tbody');
    tbody.innerHTML = ''; 

    if (!animals || animals.length === 0) {
        messageBox.classList.remove("d-none");
        animalTable.classList.add("d-none");
        pagination.classList.add("d-none");
    } else {
        messageBox.classList.add("d-none");
        animalTable.classList.remove("d-none"); 
        
        // Calculate total pages based on number of entries and perPage
        const totalPages = Math.ceil(animals.length / perPage);
        
        // Show or hide pagination based on total pages
        if (totalPages > 1) {
            pagination.classList.remove("d-none");
        } else {
            pagination.classList.add("d-none");
        }

        // Calculate start and end index for the current page
        const startIndex = (currentPage - 1) * perPage;
        const endIndex = startIndex + perPage;

        animals.slice(startIndex, endIndex).forEach(animal => {
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

            // Create and append delete button
            let deleteButton = document.createElement("span");
            deleteButton.setAttribute("type", "button");
            let deleteIcon = document.createElement("i");
            // Create icon
            deleteIcon.classList.add("fa-solid", "fa-trash-can");
            // Set icon attributes
            deleteIcon.setAttribute("data-bs-toggle", "tooltip");
            deleteIcon.setAttribute("data-bs-placement", "top");
            deleteIcon.setAttribute("data-bs-custom-class", "custom-tooltip");
            deleteIcon.setAttribute("data-bs-title", "Delete Animal");

            deleteButton.setAttribute("data-bs-toggle", "modal");
            deleteButton.setAttribute("data-bs-target", "#exampleModal");

            deleteButton.classList.add("btn", "btn-danger", "my-1", "mx-1");
            deleteButton.appendChild(deleteIcon);

            deleteButton.addEventListener("click", (event) => {
                event.preventDefault();
                currentAnimal = animal; // Set the current animal to be deleted
                exampleModal.show();
            });
            newCell8.appendChild(deleteButton);

            // Create and append edit link
            let editLink = document.createElement("a");
            let editIcon = document.createElement("i");
            editIcon.classList.add("fa-solid", "fa-pen-to-square");
            editIcon.setAttribute("data-bs-toggle", "tooltip");
            editIcon.setAttribute("data-bs-placement", "top");
            editIcon.setAttribute("data-bs-custom-class", "custom-tooltip");
            editIcon.setAttribute("data-bs-title", "Edit Animal");
            editLink.appendChild(editIcon);
            editLink.href = `add.html?name=${animal.name}`;
            
            editLink.classList.add("btn", "btn-primary", "my-1", "mx-1");
            newCell8.appendChild(editLink);
        });

        // Reinitialize tooltips after creating new elements
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

        // Draw pagination links
        drawPagination(totalPages);
    }
}

// Add event listener for the confirm delete button
confirmDeleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (currentAnimal && deleteAnimal(currentAnimal.name)) {
        let newList = getAnimal();
        drawAnimalTable(newList);
        exampleModal.hide();
        currentAnimal = null; // Reset the current animal
    } else {
        alert("Could not delete the animal.");
    }
});

function drawPagination(totalPages) {
    pagination.innerHTML = '';

    // Previous Page Button
    let previousButton = document.createElement("li");
    previousButton.classList.add("page-item");
    if (currentPage === 1) {
        previousButton.classList.add("disabled");
    }
    let previousLink = document.createElement("a");
    previousLink.classList.add("page-link");
    previousLink.href = "#";
    previousLink.textContent = "Previous";
    previousLink.addEventListener("click", (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            drawAnimalTable(getAnimal());
        }
    });
    previousButton.appendChild(previousLink);
    pagination.appendChild(previousButton);

    // Page Number Buttons
    for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement("li");
        pageButton.classList.add("page-item");
        if (i === currentPage) {
            pageButton.classList.add("active");
        }
        let pageLink = document.createElement("a");
        pageLink.classList.add("page-link");
        pageLink.href = "#";
        pageLink.textContent = i;
        pageLink.addEventListener("click", (event) => {
            event.preventDefault();
            currentPage = i;
            drawAnimalTable(getAnimal());
        });
        pageButton.appendChild(pageLink);
        pagination.appendChild(pageButton);
    }

    // Next Page Button
    let nextButton = document.createElement("li");
    nextButton.classList.add("page-item");
    if (currentPage === totalPages) {
        nextButton.classList.add("disabled");
    }
    let nextLink = document.createElement("a");
    nextLink.classList.add("page-link");
    nextLink.href = "#";
    nextLink.textContent = "Next";
    nextLink.addEventListener("click", (event) => {
        event.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            drawAnimalTable(getAnimal());
        }
    });
    nextButton.appendChild(nextLink);
    pagination.appendChild(nextButton);
}
