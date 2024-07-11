import express from 'express';
 
export const router = express.Router();
 
router.get('/', (req, res, next) => {
    const {url, method} = req;
    console.log(method, url);
 
    const headers = {'Content-Type' : 'text/plain'};
    res.writeHead(200, headers);
    res.end('home page');
});
 
router.get('/about', (req, res, next) => {
    const {url, method} = req;
    console.log(method, url);
 
    const headers = {'Content-Type' : 'text/plain'};
    res.writeHead(200, headers);
    res.end('about page');
});
 
router.get('/contact', (req, res, next) => {
    const {url, method} = req;
    console.log(method, url);
 
    const headers = {'Content-Type' : 'text/plain'};
    res.writeHead(200, headers);
    res.end('contact page');
});
 
 
 