import Animal from '../../models/Animal.js';

const handle = async (request, response, next) => {
  try {
    const { id } = request.params;
    const result = await Animal.findOneAndDelete(id);

    response.json({ message: 'Animal deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export default { handle };
