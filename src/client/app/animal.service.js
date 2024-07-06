const API_BASE_URL = 'https://inft2202.paclan.net/api/animals';
const API_KEY = '6673060870ac5daabdfcb542';

/**
 * Retrieves a list of animals from the Course API.
 * @returns {Promise<Array>} The list of animals.
 * @throws {Error} If there's an issue fetching animals.
 */
export async function getAnimal() {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch animals');
        }

        const data = await response.json();
        return data.records;  // Adjusting to return the records array
    } catch (error) {
        console.error('Error in getAnimal:', error);
        throw error;
    }
}

/**
 * Saves a new animal to the Course API.
 * @param {Object} animal The animal data to save.
 * @returns {Promise<Object>} The saved animal data.
 * @throws {Error} If there's an issue saving the animal.
 */
export async function saveAnimal(animal) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(animal)
        });

        if (!response.ok) {
            throw new Error('Failed to save animal');
        }

        const savedAnimal = await response.json();
        showMessage('Animal saved successfully!', 'success'); // Example function to show success message
        return savedAnimal;
    } catch (error) {
        console.error('Error in saveAnimal:', error);
        throw error;
    }
}

/**
 * Finds an animal by its name in the Course API.
 * @param {string} animalName The name of the animal to find.
 * @returns {Promise<Object>} The found animal data.
 * @throws {Error} If there's an issue finding the animal.
 */
export async function findAnimal(animalName) {
    try {
        const response = await fetch(`${API_BASE_URL}/${animalName}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });

        if (!response.ok) {
            throw new Error('Failed to find animal');
        }

        const foundAnimal = await response.json();
        return foundAnimal;
    } catch (error) {
        console.error('Error in findAnimal:', error);
        throw error;
    }
}

/**
 * Updates an existing animal in the Course API.
 * @param {Object} animal The animal data to update.
 * @returns {Promise<Object>} The updated animal data.
 * @throws {Error} If there's an issue updating the animal.
 */
export async function updateAnimal(animal) {
    try {
        const response = await fetch(`${API_BASE_URL}/${animal.name}`, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(animal)
        });

        if (!response.ok) {
            throw new Error('Failed to update animal');
        }

        const updatedAnimal = await response.json();
        return updatedAnimal;
    } catch (error) {
        console.error('Error in updateAnimal:', error);
        throw error;
    }
}

/**
 * Deletes an animal by its name in the Course API.
 * @param {string} animalName The name of the animal to delete.
 * @returns {Promise<void>}
 * @throws {Error} If there's an issue deleting the animal.
 */
export async function deleteAnimal(animalName) {
    try {
        const response = await fetch(`${API_BASE_URL}/${animalName}`, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });

        const data = await response.json(); // If your API returns data upon deletion, handle it here

        if (!response.ok) {
            throw new Error(`Failed to delete animal: ${response.statusText}`);
        }

        return data; // Return any response data if needed
    } catch (error) {
        console.error('Error in deleteAnimal:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
}


/**
 * Searches for animals with pagination.
 * @param {number} [page=1] The page number to fetch.
 * @param {number} [perPage=5] The number of animals per page.
 * @returns {Promise<Object>} The paginated list of animals.
 * @throws {Error} If there's an issue searching for animals.
 */
export async function searchAnimals(page = 1, perPage = 5) {
    try {
        const response = await fetch(`${API_BASE_URL}?page=${page}&perPage=${perPage}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'apikey': API_KEY
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });

        if (!response.ok) {
            throw new Error('Failed to search animals');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in searchAnimals:', error);
        throw error;
    }
}
