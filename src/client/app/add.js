console.log('we are on the add page');

document.getElementById('animalForm').addEventListener('submit', submitAnimalForm);

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
        putAnimalInStorage(animalObject);
        animalForm.reset(); // Optional: Reset the form after successful submission
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
    const species = form.species.value;
    const eleSpeciesError = form.species.nextElementSibling;
    if (species === "") {
        eleSpeciesError.classList.remove('d-none');
        eleSpeciesError.textContent = "You must specify the species of this animal";
        valid = false;
    } else {
        eleSpeciesError.classList.add('d-none');
    }

    // Validate age
    const age = form.age.value;
    const eleAgeError = form.age.nextElementSibling;
    if (age === "") {
        eleAgeError.classList.remove('d-none');
        eleAgeError.textContent = "You must specify the age of this animal";
        valid = false;
    } else if (isNaN(age)) {
        eleAgeError.classList.remove('d-none');
        eleAgeError.textContent = "This must be a number";
        valid = false;
    } else {
        eleAgeError.classList.add('d-none');
    }

    // Validate breed
    const breed = form.breed.value;
    const eleBreedError = form.breed.nextElementSibling;
    if (breed === "") {
        eleBreedError.classList.remove('d-none');
        eleBreedError.textContent = "You must specify the breed of this animal";
        valid = false;
    } else {
        eleBreedError.classList.add('d-none');
    }

    // Validate legs
    const legs = form.legs.value;
    const eleLegError = form.legs.nextElementSibling;
    if (legs === "") {
        eleLegError.classList.remove('d-none');
        eleLegError.textContent = "You must specify how many legs this animal has";
        valid = false;
    } else if (isNaN(legs)) {
        eleLegError.classList.remove('d-none');
        eleLegError.textContent = "This must be a number";
        valid = false;
    } else {
        eleLegError.classList.add('d-none');
    }

    // Validate eyes
    const eyes = form.eyes.value;
    const eleEyesError = form.eyes.nextElementSibling;
    if (eyes === "") {
        eleEyesError.classList.remove('d-none');
        eleEyesError.textContent = "You must specify how many eyes this animal has";
        valid = false;
    } else if (isNaN(eyes)) {
        eleEyesError.classList.remove('d-none');
        eleEyesError.textContent = "This must be a number";
        valid = false;
    } else {
        eleEyesError.classList.add('d-none');
    }

    // Validate sound
    const sound = form.sound.value;
    const eleSoundError = form.sound.nextElementSibling;
    if (sound === "") {
        eleSoundError.classList.remove('d-none');
        eleSoundError.textContent = "You must specify what sound this animal makes";
        valid = false;
    } else {
        eleSoundError.classList.add('d-none');
    }

    return valid;
}

function putAnimalInStorage(animal) {
    console.log(animal);
    let animals = JSON.parse(localStorage.getItem('animals')) || [];
    animals.push(animal);
    localStorage.setItem('animals', JSON.stringify(animals));
}
