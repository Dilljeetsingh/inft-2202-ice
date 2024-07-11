import Animal from '../../models/Animal.js';

const handle = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { name, breed, eyes, legs, sound } = request.body;

    const updatedAnimal = await Animal.findOneAndUpdate(
      id,
      { name, breed, eyes, legs, sound }

    );

    response.json(updatedAnimal);
  } catch (error) {
    next(error);
  }
};

export default { handle };
