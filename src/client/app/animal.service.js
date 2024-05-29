export function getAnimal() {
    let animals = localStorage.getItem('animals');

    if (animals) {
        animals = JSON.parse(animals);
    } else {
        animals = [];
    }
    return animals;
}

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
