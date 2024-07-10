import express, { response } from 'express';

export const animalRouter = express.Router();


  animalRouter.get('/animal', (request, response, next)=>{
    const {url, method} = request;
    const headers = {'content-type': "text/plain"}

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Welcome to the index page');
  });
   
  animalRouter.post('/animal', (request, response, next)=>{
    const {url, method} = request;
    const headers = {'content-type': "text/plain"}

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('post page');
  });   

  animalRouter.delete('/animal/:id', (request, response, next)=>{
    const {url, method} = request;
    const headers = {'content-type': "text/plain"}

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('delete the page');
  });   

  animalRouter.get('/animal/:id', (request, response, next)=>{
    const {url, method} = request;
    const headers = {'content-type': "text/plain"}

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('get the page by id');
  });   

  animalRouter.put('/animal/:id', (request, response, next)=>{
    const {url, method} = request;
    const headers = {'content-type': "text/plain"}

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('put the page by id');
  });   

