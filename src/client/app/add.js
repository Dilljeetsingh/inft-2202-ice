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
    console.log('Form is valid');

    // Construct animal object from form values
    const animalObject = {
      name: animalForm.name.value,
      breed: animalForm.breed.value,
      legs: animalForm.legs.value,
      eyes: animalForm.eyes.value,
      sound: animalForm.sound.value,
    };

    // Save animal using saveAnimal function
    saveAnimal(animalObject)
      .then(() => {
        // Reset the form after successful submission
        animalForm.reset();
        console.log('Animal saved successfully');
        // Optionally, redirect to list page or show success message
        window.location.href = "list.html";
      })
      .catch(error => {
        // Handle error if saveAnimal fails
        console.error('Failed to save animal:', error);
        const duplicateError = document.getElementById('duplicateError');
        duplicateError.classList.remove('d-none');
        console.log('Animal with this name already exists');
      });
  } else {
    console.log('Form is not valid');
  }
}

// Function to validate animal form
export function validateAnimalForm(form) {
  console.log('Validating form');
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
