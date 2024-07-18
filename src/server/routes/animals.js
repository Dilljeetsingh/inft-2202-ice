import express from 'express';


import AnimalsCreateController from '../controllers/animals/create.js';
import AnimalsRetrieveController from '../controllers/animals/retrieve.js';
import AnimalsDeleteController from '../controllers/animals/delete.js';
import AnimalsSearchController from '../controllers/animals/search.js';
import AnimalsUpdateController from '../controllers/animals/update.js';

import { CheckValidation } from '../middleware/validation.js';

export const animalRouter = express.Router();


  animalRouter.get('/animals', CheckValidation(AnimalsSearchController.rules),AnimalsSearchController.handle);

  animalRouter.post('/animals', CheckValidation(AnimalsCreateController.rules),AnimalsCreateController.handle);


  animalRouter.get('/animals/:animalID', AnimalsRetrieveController.handle);

  animalRouter.delete('/animals/:id', AnimalsDeleteController.handle);
  animalRouter.put('/animals/:id', AnimalsUpdateController.handle);

 
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

