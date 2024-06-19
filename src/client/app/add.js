// src/client/app/add.js
import { saveAnimal } from './animal.service.mock.js';

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
    try {
      saveAnimal(animalObject);
      const duplicateError = document.getElementById('duplicateError');
      duplicateError.classList.add('d-none');
      animalForm.reset(); // Reset the form after successful submission
      console.log('Form reset after successful submission');
    } catch (error) {
      const duplicateError = document.getElementById('duplicateError');
      duplicateError.classList.remove('d-none');
      console.log('Animal with this name already exists');
    }
  } else {
    console.log('we are not good');
  }
}

/// Export the validateAnimalForm function to be used in edit.js
export function validateAnimalForm(form) {
  console.log('validating');
  let valid = true;

  // Validate name
  const name = form.name.value.trim();
  const eleNameError = form.name.nextElementSibling;
  if (name === "") {
    eleNameError.classList.remove('d-none');
    eleNameError.textContent = "You must name this animal";
    valid = false;
  } else {
    eleNameError.classList.add('d-none');
  }

  // Validate species
  const species = form.species.value.trim();
  const eleSpeciesError = form.species.nextElementSibling;
  if (species === "") {
    eleSpeciesError.classList.remove('d-none');
    eleSpeciesError.textContent = "Species is required";
    valid = false;
  } else {
    eleSpeciesError.classList.add('d-none');
  }

  // Validate age
  const age = form.age.value;
  const eleAgeError = form.age.nextElementSibling;
  if (age === "" || isNaN(age) || age < 0) {
    eleAgeError.classList.remove('d-none');
    eleAgeError.textContent = "Please enter a valid age";
    valid = false;
  } else {
    eleAgeError.classList.add('d-none');
  }

  // Validate breed
  const breed = form.breed.value.trim();
  const eleBreedError = form.breed.nextElementSibling;
  if (breed === "") {
    eleBreedError.classList.remove('d-none');
    eleBreedError.textContent = "Breed is required";
    valid = false;
  } else {
    eleBreedError.classList.add('d-none');
  }

  // Validate legs
  const legs = form.legs.value;
  const eleLegsError = form.legs.nextElementSibling;
  if (legs === "" || isNaN(legs) || legs < 0) {
    eleLegsError.classList.remove('d-none');
    eleLegsError.textContent = "Please enter a valid number of legs";
    valid = false;
  } else {
    eleLegsError.classList.add('d-none');
  }

  // Validate eyes
  const eyes = form.eyes.value;
  const eleEyesError = form.eyes.nextElementSibling;
  if (eyes === "" || isNaN(eyes) || eyes < 0) {
    eleEyesError.classList.remove('d-none');
    eleEyesError.textContent = "Please enter a valid number of eyes";
    valid = false;
  } else {
    eleEyesError.classList.add('d-none');
  }

  // Validate sound
  const sound = form.sound.value.trim();
  const eleSoundError = form.sound.nextElementSibling;
  if (sound === "") {
    eleSoundError.classList.remove('d-none');
    eleSoundError.textContent = "Sound is required";
    valid = false;
  } else {
    eleSoundError.classList.add('d-none');
  }

  return valid;
}

