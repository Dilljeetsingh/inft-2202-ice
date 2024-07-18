import express, { request, response } from 'express';
import mongoose from 'mongoose';

import { LoggingMiddleware } from './middleware/logging.js';

import {logger } from './utils/logger.js';

import { router } from './routes/router.js';


const port = 3000;

const server = express();

server.use(express.json());

server.use(LoggingMiddleware);

server.use(router);

server.use(express.static(`${import.meta.dirname}/../client`));
server.use('/node_modules', express.static(import.meta.dirname + '/../../node_modules'));

server.use((error, request, response, next) => {
    const {message, stack} = error;
    const {method, originalUrl, headers, query, body, params} = request
    const context = {
        time: (new Date().getTime()),
        stack,
        req: {method, path:originalUrl, headers, query, body, params},
        res: {body: response.locals.data, statusCode: error.staus ?? 500}
    }
    logger.error(`${error.status ?? 500}: ${message}`, context);

    response.status(error.status ?? 500).send({error: message})

});

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
