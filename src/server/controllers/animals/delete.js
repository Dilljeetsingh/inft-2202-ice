import Animal from '../../models/Animal.js';
import { NotFoundError } from '../../errors/NotFoundError.js';

const handle = async (request, response, next) => {
  try {
    const { id } = request.params;
    
    // Ensure the ID is correctly formatted
    if (!id) {
      throw new NotFoundError('No ID provided.');
    }

    const result = await Animal.findOneAndDelete({ _id: id });

    if (!result) {
      throw new NotFoundError('Animal not found.');
    }

    response.json({ message: 'Animal deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export default { handle };
