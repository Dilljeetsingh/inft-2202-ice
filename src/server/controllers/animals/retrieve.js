import Animal from '../../models/Animal.js';
import { NotFoundError } from '../../errors/NotFoundError.js';

const handle = async (request, response, next )=>{

    try{
        const animal = await Animal.findOne({
            _id: request.params.animalID
        });
        if (!animal) {
            throw new NotFoundError ('could not find that animal.')
        }
        response.json(animal);

    }catch (error){
        next(error);
    }
};
export default {handle};