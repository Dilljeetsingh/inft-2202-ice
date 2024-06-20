const BASE_URL = 'https://inft2202.paclan.net/api/animals';
const API_KEY = '6673060870ac5daabdfcb542';

/**
 * Retrieves a list of animals from the Course API.
 * @returns {Promise<Array>} The list of animals.
 * @throws {Error} If there's an issue fetching animals.
 */
export async function getAnimal() {
    try {
        const response = await fetch(BASE_URL, {
            headers: {
                'apikey': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch animals.');
        }

        const animals = await response.json();
        return animals;
    } catch (error) {
        throw new Error(`Error fetching animals: ${error.message}`);
    }
}

/**
 * Saves a new animal to the Course API if it doesn't already exist.
 * @param {Object} animal - The animal object to be saved.
 * @returns {boolean} True if the animal was saved successfully.
 * @throws {Error} If the animal already exists or there's an issue saving.
 */
export async function saveAnimal(animal) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY
            },
            body: JSON.stringify(animal)
        });

        if (!response.ok) {
            throw new Error('Failed to save animal.');
        }

        return true;
    } catch (error) {
        throw new Error(`Error saving animal: ${error.message}`);
    }
}

/**
 * Finds an animal by name from the Course API.
 * @param {string} name - The name of the animal to find.
 * @returns {Object|null} The animal object if found, or null if not found.
 * @throws {Error} If there's an issue fetching the animal.
 */
export async function findAnimal(name) {
    try {
        const url = `${BASE_URL}/${name}`;
        const response = await fetch(url, {
            headers: {
                'apikey': API_KEY
            }
        });

        if (response.status === 404) {
            return null; // Animal not found
        }

        if (!response.ok) {
            throw new Error('Failed to find animal.');
        }

        const animal = await response.json();
        return animal;
    } catch (error) {
        throw new Error(`Error finding animal: ${error.message}`);
    }
}

/**
 * Updates an existing animal in the Course API.
 * @param {Object} animal - The animal object with updated information.
 * @returns {boolean} True if the animal was updated successfully.
 * @throws {Error} If the animal was not found or there's an issue updating.
 */
export async function updateAnimal(animal) {
    try {
        const url = `${BASE_URL}/${animal.name}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY
            },
            body: JSON.stringify(animal)
        });

        if (response.status === 404) {
            throw new Error(`Animal with name ${animal.name} not found.`);
        }

        if (!response.ok) {
            throw new Error('Failed to update animal.');
        }

        return true;
    } catch (error) {
        throw new Error(`Error updating animal: ${error.message}`);
    }
}

/**
 * Deletes an animal by name from the Course API.
 * @param {string} name - The name of the animal to delete.
 * @returns {boolean} True if the animal was deleted successfully.
 * @throws {Error} If the animal was not found or there's an issue deleting.
 */
export async function deleteAnimal(name) {
    try {
        const url = `${BASE_URL}/${name}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'apikey': API_KEY
            }
        });

        if (response.status === 404) {
            throw new Error(`Animal with name ${name} not found.`);
        }

        if (!response.ok) {
            throw new Error('Failed to delete animal.');
        }

        return true;
    } catch (error) {
        throw new Error(`Error deleting animal: ${error.message}`);
    }
}
/**
 * Retrieves the list of animals from the server API.
 * @returns {Promise<Array>} The list of animals.
 */
export async function listAnimals() {
    try {
        const response = await fetch(BASE_URL, {
            headers: {
                'apikey': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch animals. Status: ${response.status}`);
        }

        const data = await response.json();

        console.log('API Response:', data); // Log the API response

        // Ensure data is an array of animals
        if (!Array.isArray(data)) {
            throw new Error('Invalid data format received. Expected an array.');
        }

        return data; // Return the array of animals
    } catch (error) {
        throw new Error(`Error fetching animals: ${error.message}`);
    }
}
