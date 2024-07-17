import express from 'express';
 
export const router = express.Router();
 
// import { contentRoutes  } from './content.js';
import { animalRouter } from './animals.js';


router.use('/api',animalRouter);