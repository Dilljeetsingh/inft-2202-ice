/**
 * Retrieves the list of animals from local storage.
 * @returns {Promise<Array>} The list of animals.
 */
export function getAnimal() {
    return new Promise((resolve) => {
        let animals = localStorage.getItem('animals');
        if (animals) {
            animals = JSON.parse(animals);
        } else {
            animals = [];
        }
        console.log('Fetched animals from local storage:', animals); // Debugging statement
        resolve(animals);
    });
}

/**
 * Saves a new animal to local storage if it doesn't already exist.
 * @param {Object} animal - The animal object to be saved.
 * @returns {Promise<boolean>} True if the animal was saved, throws an error if it already exists.
 * @throws {Error} If the animal already exists.
 */
export function saveAnimal(animal) {
    return new Promise((resolve, reject) => {
        getAnimal().then(animals => {
            if (animals.find(a => a.name === animal.name)) {
                reject(new Error(`Animal with name ${animal.name} already exists.`));
            } else {
                animals.push(animal);
                localStorage.setItem('animals', JSON.stringify(animals));
                resolve(true);
            }
        });
    });
}

/**
 * Finds an animal by name.
 * @param {string} name - The name of the animal to find.
 * @returns {Promise<Object|null>} The animal object if found, or null if not found.
 */
export function findAnimal(name) {
    return new Promise((resolve) => {
        getAnimal().then(animals => {
            let animal = animals.find(a => a.name === name);
            resolve(animal || null);
        });
    });
}

/**
 * Updates an existing animal in local storage.
 * @param {Object} animal - The animal object with updated information.
 * @returns {Promise<boolean>} True if the animal was updated, throws an error if it was not found.
 * @throws {Error} If the animal was not found.
 */
export function updateAnimal(animal) {
    return new Promise((resolve, reject) => {
        getAnimal().then(animals => {
            let index = animals.findIndex(a => a.name === animal.name);
            if (index !== -1) {
                animals[index] = animal;
                localStorage.setItem('animals', JSON.stringify(animals));
                resolve(true);
            } else {
                reject(new Error(`Animal with name ${animal.name} not found.`));
            }
        });
    });
}

/**
 * Deletes an animal by name from local storage.
 * @param {string} name - The name of the animal to delete.
 * @returns {Promise<boolean>} True if the animal was deleted, throws an error if it was not found.
 * @throws {Error} If the animal was not found.
 */
export function deleteAnimal(name) {
    return new Promise((resolve, reject) => {
        getAnimal().then(animals => {
            let index = animals.findIndex(a => a.name === name);
            if (index !== -1) {
                animals.splice(index, 1);
                localStorage.setItem('animals', JSON.stringify(animals));
                resolve(true);
            } else {
                reject(new Error(`Animal with name ${name} not found.`));
            }
        });
    });
}
