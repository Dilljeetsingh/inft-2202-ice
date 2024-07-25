import Animal from '../../models/Animal.js';
import { NotFoundError } from '../../errors/NotFoundError.js';
import { ConflictError } from '../../errors/ConflictError.js';

const handle = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { name, breed, eyes, legs, sound } = request.body;

    if (!id) {
      throw new NotFoundError('No ID provided.');
    }

    const updatedAnimal = await Animal.findOneAndUpdate(
      { _id: id },
      { name, breed, eyes, legs, sound },
      { new: true, runValidators: true }
    );

    if (!updatedAnimal) {
      throw new NotFoundError('Animal not found.');
    }

    response.json(updatedAnimal);
  } catch (error) {
    next(error);
  }
};

export default { handle };
