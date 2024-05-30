/**
 * Retrieves the list of animals from local storage.
 * @returns {Array} The list of animals.
 */
export function getAnimal() {
    let animals = localStorage.getItem('animals');

    if (animals) {
        animals = JSON.parse(animals);
    } else {
        animals = [];
    }
    return animals;
}

/**
 * Saves a new animal to local storage if it doesn't already exist.
 * @param {Object} animal - The animal object to be saved.
 * @returns {boolean} True if the animal was saved, false if it already exists.
 */
export function saveAnimal(animal) {
    let animals = getAnimal();
    if (animals.find(a => a.name === animal.name)) {
        return false;
    } else {
        animals.push(animal);
        localStorage.setItem('animals', JSON.stringify(animals));
        return true;
    }
}

/**
 * Finds an animal by name.
 * @param {string} name - The name of the animal to find.
 * @returns {Object|null} The animal object if found, or null if not found.
 */
export function findAnimal(name) {
    let animals = getAnimal();
    let animal = animals.find(a => a.name === name);
    return animal || null;
}

/**
 * Updates an existing animal in local storage.
 * @param {Object} animal - The animal object with updated information.
 * @returns {boolean} True if the animal was updated, false if it was not found.
 */
export function updateAnimal(animal) {
    let animals = getAnimal();
    let index = animals.findIndex(a => a.name === animal.name);

    if (index !== -1) {
        animals[index] = animal;
        localStorage.setItem('animals', JSON.stringify(animals));
        return true;
    } else {
        return false;
    }
}

/**
 * Deletes an animal by name from local storage.
 * @param {string} name - The name of the animal to delete.
 * @returns {boolean} True if the animal was deleted, false if it was not found.
 */
export function deleteAnimal(name) {
    let animals = getAnimal();
    let index = animals.findIndex(a => a.name === name);

    if (index !== -1) {
        animals.splice(index, 1);
        localStorage.setItem('animals', JSON.stringify(animals));
        return true;
    } else {
        return false;
    }
}
