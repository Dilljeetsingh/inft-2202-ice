import express from 'express';
import { animalRouter } from './routes/animals.js';


const port = 3000;

const server = express();

server.use(animalRouter);

server.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})