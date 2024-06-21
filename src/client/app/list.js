// list.js

import { getAnimal, saveAnimal, findAnimal, updateAnimal, deleteAnimal } from "../app/animal.service.js";

// Get references to the message box, animal table, and pagination
const messageBox = document.querySelector("#empty-message");
const animalTable = document.querySelector("#animal-list");
const tbody = animalTable.querySelector('tbody');
const pagination = document.querySelector(".pagination");

// Get the modal instance and confirm delete button
const exampleModal = new bootstrap.Modal('#exampleModal');
const confirmDeleteButton = document.querySelector('#exampleModal .btn-primary');

// Default values for pagination and records per page
let perPage = 5; // Number of entries per page
let currentPage = 1; // Current page number
let currentAnimal = null; // Variable to store the animal to be deleted

// Function to update URL parameters
function updateURLParams() {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', currentPage);
    queryParams.set('perPage', perPage);
    history.replaceState(null, null, `?${queryParams.toString()}`);
}

// Function to read URL parameters
function readURLParams() {
    const queryParams = new URLSearchParams(window.location.search);
    currentPage = parseInt(queryParams.get('page')) || 1;
    perPage = parseInt(queryParams.get('perPage')) || 5;
}

// Function to show and hide spinner
function showSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
}

function hideSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
}

// Initial call to populate the table
readURLParams(); // Read initial URL parameters

// Function to fetch and draw animal table
function fetchAndDrawAnimalTable() {
    showSpinner(); // Show spinner

    getAnimal().then(animalList => {
        hideSpinner(); // Hide spinner after data is fetched
        console.log('Initial animal list:', animalList); // Debugging statement

        // Ensure animalList is an array
        if (!Array.isArray(animalList)) {
            console.error('Animal list is not an array:', animalList);
            animalList = []; // Set to an empty array to avoid further errors
        }

        drawAnimalTable(animalList);
    });
}

// Check if page is being refreshed
let refreshed = performance.navigation.type === 1;

// If page is refreshed, show spinner briefly
if (refreshed) {
    // Set default values for currentPage and perPage
    currentPage = 1;
    perPage = 5;

    showSpinner();
    setTimeout(() => {
        hideSpinner();
        fetchAndDrawAnimalTable(); // Fetch data after spinner hides
    }, 1000); // Adjust timeout as needed
} else {
    fetchAndDrawAnimalTable(); // Otherwise, fetch data normally
}

// Function to draw animal table
function drawAnimalTable(animals) {
    console.log('Drawing animal table with animals:', animals); // Debugging statement
    tbody.innerHTML = ''; // Clear existing table rows

    if (!animals || animals.length === 0) {
        messageBox.classList.remove("d-none");
        animalTable.classList.add("d-none");
        pagination.classList.add("d-none");
    } else {
        messageBox.classList.add("d-none");
        animalTable.classList.remove("d-none");
        pagination.classList.remove("d-none");

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
            newCell2.textContent = animal.breed;

            let newCell3 = newRow.insertCell();
            newCell3.textContent = animal.legs;

            let newCell4 = newRow.insertCell();
            newCell4.textContent = animal.eyes;

            let newCell5 = newRow.insertCell();
            newCell5.textContent = animal.sound;

            let newCell6 = newRow.insertCell();

            // Create delete button
            let deleteButton = document.createElement("button");
            deleteButton.setAttribute("type", "button");
            deleteButton.classList.add("btn", "btn-danger", "my-1", "mx-1");
            deleteButton.innerHTML = '<i class="fa-solid fa-trash-can" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Delete Animal"></i>';
            deleteButton.addEventListener("click", () => {
               // currentAnimal = animal; // Set the current animal to be deleted
               // exampleModal.show();
            });
            newCell6.appendChild(deleteButton);

            // Create edit link
            let editLink = document.createElement("a");
            editLink.classList.add("btn", "btn-primary", "my-1", "mx-1");
            editLink.innerHTML = '<i class="fa-solid fa-pen-to-square" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Edit Animal"></i>';
            //editLink.href = `add.html?name=${encodeURIComponent(animal.name)}`;
            newCell6.appendChild(editLink);
        });

        // Reinitialize tooltips after creating new elements
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new bootstrap.Tooltip(tooltipTriggerEl);
        });

        // Draw pagination links
        drawPagination(totalPages);
    }
}

// Function to update pagination
function updatePagination(totalPages) {
    pagination.innerHTML = ''; // Clear existing pagination

    for (let i = 1; i <= totalPages; i++) {
        let li = document.createElement('li');
        li.classList.add('page-item', currentPage === i ? 'active' : '');
        let a = document.createElement('a');
        a.classList.add('page-link');
        a.href = '#';
        a.textContent = i;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            updateURLParams();
            fetchAndDrawAnimalTable();
        });
        li.appendChild(a);
        pagination.appendChild(li);
    }
    // Update URL params after updating pagination
    updateURLParams();
}

// Handle delete confirmation
confirmDeleteButton.addEventListener("click", () => {
    if (currentAnimal) {
        deleteAnimal(currentAnimal.name).then(() => {
            getAnimal().then(animalList => {
                if (!Array.isArray(animalList)) {
                    console.error('Animal list is not an array:', animalList);
                    animalList = [];
                }
                fetchAndDrawAnimalTable();
            });
        });
    }
});

// Get references to the dropdown for records per page
const recordsPerPageDropdown = document.querySelector("#recordsPerPage");

recordsPerPageDropdown.addEventListener('change', () => {
    perPage = parseInt(recordsPerPageDropdown.value);
    currentPage = 1; // Reset to the first page when changing records per page
    updateURLParams();
    fetchAndDrawAnimalTable();
});

// Function to draw pagination
function drawPagination(totalPages) {
    pagination.innerHTML = ''; // Clear existing pagination

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
            fetchAndDrawAnimalTable();
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
            fetchAndDrawAnimalTable();
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
            fetchAndDrawAnimalTable();
        }
    });
    nextButton.appendChild(nextLink);
    pagination.appendChild(nextButton);
}
