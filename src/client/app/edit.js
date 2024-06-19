import { findAnimal, updateAnimal } from './animal.service.mock.js';
import { validateAnimalForm } from './add.js'; // Import the validation function

const urlParams = new URLSearchParams(window.location.search);
const nameParam = urlParams.get('name');

if (nameParam) {
    setupEditForm(nameParam);
}

function setupEditForm(name) {
    const heading = document.querySelector('h1');
    heading.textContent = 'Edit Animal';

    const animal = findAnimal(name);
    if (animal) {
        const animalForm = document.getElementById('animalForm');

        animalForm.name.value = animal.name;
        animalForm.species.value = animal.species;
        animalForm.age.value = animal.age;
        animalForm.breed.value = animal.breed;
        animalForm.legs.value = animal.legs;
        animalForm.eyes.value = animal.eyes;
        animalForm.sound.value = animal.sound;

        animalForm.name.disabled = true;

        animalForm.addEventListener('submit', submitEditForm);
    } else {
        console.error('Animal not found');
    }
}

function submitEditForm(event) {
    event.preventDefault();
    const animalForm = event.target;
    const valid = validateAnimalForm(animalForm);
    if (valid) {
        const animalObject = {
            name: animalForm.name.value,
            species: animalForm.species.value,
            age: animalForm.age.value,
            breed: animalForm.breed.value,
            legs: animalForm.legs.value,
            eyes: animalForm.eyes.value,
            sound: animalForm.sound.value,
        };

        try {
            updateAnimal(animalObject);
            alert('Animal updated successfully');
        } catch (error) {
            console.error('Error updating animal:', error.message);
        }
    } else {
        console.log('Form validation failed');
    }
}
