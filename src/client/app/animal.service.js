export function getAnimals() {
    let animals;
    if (localStorage.getItem('animals')) {
        animals = JSON.parse(localStorage.getItem('animals'));
    } else {
        animals = [];
    }
    return animals;
}

export function saveAnimal(animal) {
    const animals = getAnimals();
    if (animals.find(a => a.name === animal.name)) {
        console.log('Animal with this name already exists');
        return false; // Animal with the same name already exists
    }
    animals.push(animal);
    localStorage.setItem('animals', JSON.stringify(animals));
    console.log('Animal saved successfully');
    return true;
}

// export AnimalService() {
//     AnimalService.prototype.getAnimals = getAnimals;
//     AnimalService.prototype.saveAnimal = saveAnimal;

//     export default new AnimalService();
// }