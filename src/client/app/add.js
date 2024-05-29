// src/client/app/add.js

import { saveAnimal } from './animal.service.js';

console.log('we are on the add page');

const urlParams = new URLSearchParams(window.location.search);
const nameParam = urlParams.get('name');

if (!nameParam) {
  // No name parameter, we are adding a new animal
  document.getElementById('animalForm').addEventListener('submit', submitAnimalForm);
} else {
  // Name parameter exists, functionality will be handled in edit.js
}

function submitAnimalForm(event) {
  event.preventDefault();
  const animalForm = event.target;
  const valid = validateAnimalForm(animalForm);
  if (valid) {
    console.log('we are good');
    const animalObject = {
      name: animalForm.name.value,
      species: animalForm.species.value,
      age: animalForm.age.value,
      breed: animalForm.breed.value,
      legs: animalForm.legs.value,
      eyes: animalForm.eyes.value,
      sound: animalForm.sound.value,
    };
    const saved = saveAnimal(animalObject);
    const duplicateError = document.getElementById('duplicateError');
    if (saved) {
      duplicateError.classList.add('d-none');
      animalForm.reset(); // Reset the form after successful submission
      console.log('Form reset after successful submission');
    } else {
      duplicateError.classList.remove('d-none');
      console.log('Animal with this name already exists');
    }
  } else {
    console.log('we are not good');
  }
}

function validateAnimalForm(form) {
  console.log('validating');
  let valid = true;

  // Validate name
  const name = form.name.value;
  const eleNameError = form.name.nextElementSibling;
  if (name === "") {
    eleNameError.classList.remove('d-none');
    eleNameError.textContent = "You must name this animal";
    valid = false;
  } else {
    eleNameError.classList.add('d-none');
  }

  // Validate species
  // Remaining validation code...

  return valid;
}

// Export the validateAnimalForm function to be used in edit.js
export { validateAnimalForm };
