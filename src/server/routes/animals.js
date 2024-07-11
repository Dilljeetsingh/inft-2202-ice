import express from 'express';


import AnimalsCreateController from '../controllers/animals/create.js'
import AnimalsRetrieveController from '../controllers/animals/retrieve.js'
import AnimalsDeleteController from '../controllers/animals/delete.js';

export const animalRouter = express.Router();


  animalRouter.get('/animals', (request, response, next)=>{
    const {url, method} = request;
    const headers = {'content-type': "text/plain"}

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Welcome to the index page');
  });
  animalRouter.post('/animals', AnimalsCreateController.handle);
  animalRouter.get('/animals/:animalID', AnimalsRetrieveController.handle);
  animalRouter.delete('/animals/:id', AnimalsDeleteController.handle);
   
  animalRouter.post('/animals', (request, response, next)=>{
    const {url, method} = request;
    const headers = {'content-type': "text/plain"}

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('post page');
  });   

  animalRouter.delete('/animals/:id', (request, response, next)=>{
    const {url, method} = request;
    const headers = {'content-type': "text/plain"}

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('delete the page');
  });   

  // animalRouter.get('/animals/:id', (request, response, next)=>{
  //   const {url, method} = request;
  //   const headers = {'content-type': "text/plain"}

  //   response.writeHead(200, { 'Content-Type': 'text/plain' });
  //   response.end('get the page by id');
  // });   

  animalRouter.put('/animals/:id', (request, response, next)=>{
    const {url, method} = request;
    const headers = {'content-type': "text/plain"}

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('put the page by id');
  });   

