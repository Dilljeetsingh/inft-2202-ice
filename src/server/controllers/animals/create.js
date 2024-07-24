import Animal from '../../models/Animal.js'
import { checkSchema } from 'express-validator';

const rules = checkSchema({
    name: {
        notEmpty: {
            errorMessage: `"name" is required!`
        }
    },
    breed: {
        notEmpty: {
            errorMessage: `"breed" is required!`
        }
    },
    eyes: {
        isNumeric: true,
        errorMessage: `"eyes" must be a Number!`
    },
    legs: {
        isNumeric: true,
            errorMessage: `"legs" must be a Number!`
    },
    sound: {
        notEmpty: {
            errorMessage: `"sound" is required!`
        }
    }
    
})

const handle = async (request, response, next )=>{

    try{
        const {name, breed, eyes, legs, sound} = request.body;
        const exits = await Animal.findOne ({name});
        if (exits){
            throw new ConflictError (`Animal already exists.`)
        }
        const animal = await Animal.create({ name, breed, eyes, legs, sound });
        response.json(animal);

    }catch (error){
        next(error);
    }
}
export default {handle, rules};

