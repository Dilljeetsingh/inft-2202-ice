import { saveAnimal } from './animal.service.mock.js'; // Replace with actual service import

console.log('we are on the add page');

const urlParams = new URLSearchParams(window.location.search);
const nameParam = urlParams.get('name');

if (!nameParam) {
  const animalForm = document.getElementById('animalForm');
  if (animalForm) {
    animalForm.addEventListener('submit', submitAnimalForm);
  }
}

function submitAnimalForm(event) {
  event.preventDefault();
  const animalForm = event.target;
  const valid = validateAnimalForm(animalForm);
  if (valid) {
    console.log('Form is valid');

    const animalObject = {
      name: animalForm.name.value,
      breed: animalForm.breed.value,
      legs: animalForm.legs.value,
      eyes: animalForm.eyes.value,
      sound: animalForm.sound.value,
    };

    saveAnimal(animalObject)
      .then(() => {
        animalForm.reset();
        console.log('Animal saved successfully');
        window.location.href = "list.html";
      })
      .catch(error => {
        console.error('Failed to save animal:', error);
        const duplicateError = document.getElementById('duplicateError');
        if (duplicateError) {
          duplicateError.classList.remove('d-none');
        }
        console.log('Animal with this name already exists');
      });
  } else {
    console.log('Form is not valid');
  }
}

export function validateAnimalForm(form) {
  console.log('Validating form');
  let valid = true;

  const name = form.name.value.trim();
  const eleNameError = document.getElementById('nameError');
  if (name === "") {
    eleNameError.classList.remove('d-none');
    eleNameError.textContent = "You must name this animal";
    valid = false;
  } else {
    eleNameError.classList.add('d-none');
  }

  const breed = form.breed.value.trim();
  const eleBreedError = document.getElementById('breedError');
  if (breed === "") {
    eleBreedError.classList.remove('d-none');
    eleBreedError.textContent = "Breed is required";
    valid = false;
  } else {
    eleBreedError.classList.add('d-none');
  }

  const legs = form.legs.value;
  const eleLegsError = document.getElementById('legsError');
  if (legs === "" || isNaN(legs) || legs < 0) {
    eleLegsError.classList.remove('d-none');
    eleLegsError.textContent = "Please enter a valid number of legs";
    valid = false;
  } else {
    eleLegsError.classList.add('d-none');
  }

  const eyes = form.eyes.value;
  const eleEyesError = document.getElementById('eyesError');
  if (eyes === "" || isNaN(eyes) || eyes < 0) {
    eleEyesError.classList.remove('d-none');
    eleEyesError.textContent = "Please enter a valid number of eyes";
    valid = false;
  } else {
    eleEyesError.classList.add('d-none');
  }

  const sound = form.sound.value.trim();
  const eleSoundError = document.getElementById('soundError');
  if (sound === "") {
    eleSoundError.classList.remove('d-none');
    eleSoundError.textContent = "Sound is required";
    valid = false;
  } else {
    eleSoundError.classList.add('d-none');
  }

  return valid;
}

// Optional: Hide the duplicate error message when the user starts typing again
document.querySelectorAll('#animalForm input').forEach(input => {
  input.addEventListener('input', () => {
    const duplicateError = document.getElementById('duplicateError');
    if (duplicateError) {
      duplicateError.classList.add('d-none');
    }
  });
});
