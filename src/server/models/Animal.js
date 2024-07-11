import { model, Schema } from 'mongoose';

// define the fields we want to see in the database
const fields ={
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    legs: {
        type: Number,
        required: true
    },
    eyes: {
        type: Number,
        required: true
    },
    sound: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
};

// create a mongoose schema
const schema = new Schema(fields);
//use it to create and export a new model named 'Animals'.
export default model('Animal', schema);