import express from 'express';
import mongoose from 'mongoose';

import { router } from './routes/router.js';


const port = 3000;

const server = express();

server.use(express.json());

server.use(express.static(`${import.meta.dirname}/../client`));
server.use('/node_modules', express.static(import.meta.dirname + '/../../node_modules'));
server.use(router);


try{
    // connect to database
    await mongoose.connect("mongodb://localhost:27017/inft2202");
    console.log('connected to database!');
    // start the server
    server.listen(port, ()=> {
        console.log(`Server is running on port ${port}`);
    })
    

}catch(error){
    console.log(error);
    process.exit(1);
}
