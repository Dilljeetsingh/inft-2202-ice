import express from 'express';

export const contentRoutes = express.Router();


contentRoutes.get('/', (req, res, next) => {
    const {url, method} = req;
    console.log(method, url);
 
    const headers = {'Content-Type' : 'text/plain'};
    res.writeHead(200, headers);
    res.end('home page');
});
 
contentRoutes.get('/about', (req, res, next) => {
    const {url, method} = req;
    console.log(method, url);
 
    const headers = {'Content-Type' : 'text/plain'};
    res.writeHead(200, headers);
    res.end('about page');
});
 
contentRoutes.get('/contact', (req, res, next) => {
    const {url, method} = req;
    console.log(method, url);
 
    const headers = {'Content-Type' : 'text/plain'};
    res.writeHead(200, headers);
    res.end('contact page');
});
 
 
 