// src/client/js/add.js

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("animalForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateAnimalForm(form)) {
            const animal = {
                name: form.name.value,
                species: form.species.value,
                age: form.age.value,
                breed: form.breed.value,
                legs: form.legs.value,
                eyes: form.eyes.value,
                sound: form.sound.value
            };
            putAnimalInStorage(animal);
            console.log('Animal added:', animal);
            form.reset(); // Optional: Reset the form after successful submission
        }
    });
});
// validate the animal form
function validateAnimalForm(form) {
    let isValid = true;

    // Validate name
    if (form.name.value.trim() === "") {
        showError(form.name, "Animal Name is required");
        isValid = false;
    } else if (animalExists(form.name.value.trim())) {
        showError(form.name, "An animal with this name already exists");
        isValid = false;
    } else {
        hideError(form.name);
    }

    // Validate species
    if (form.species.value.trim() === "") {
        showError(form.species, "Species is required");
        isValid = false;
    } else {
        hideError(form.species);
    }

    // Validate age
    if (form.age.value.trim() === "" || isNaN(form.age.value) || form.age.value <= 0) {
        showError(form.age, "Valid age is required");
        isValid = false;
    } else {
        hideError(form.age);
    }

    // Validate breed
    if (form.breed.value.trim() === "") {
        showError(form.breed, "Breed is required");
        isValid = false;
    } else {
        hideError(form.breed);
    }

    // Validate legs
    if (form.legs.value.trim() === "" || isNaN(form.legs.value) || form.legs.value < 0) {
        showError(form.legs, "Valid number of legs is required");
        isValid = false;
    } else {
        hideError(form.legs);
    }

    // Validate eyes
    if (form.eyes.value.trim() === "" || isNaN(form.eyes.value) || form.eyes.value < 0) {
        showError(form.eyes, "Valid number of eyes is required");
        isValid = false;
    } else {
        hideError(form.eyes);
    }

    // Validate sound
    if (form.sound.value.trim() === "") {
        showError(form.sound, "Sound is required");
        isValid = false;
    } else {
        hideError(form.sound);
    }

    return isValid;
}

function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    errorElement.classList.remove("d-none");
}

function hideError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.classList.add("d-none");
}

function putAnimalInStorage(animal) {
    let animals = JSON.parse(localStorage.getItem("animals")) || [];
    animals.push(animal);
    localStorage.setItem("animals", JSON.stringify(animals));
    console.log('Current animals in storage:', animals);
}

function animalExists(name) {
    let animals = JSON.parse(localStorage.getItem("animals")) || [];
    return animals.some(animal => animal.name.toLowerCase() === name.toLowerCase());
}
