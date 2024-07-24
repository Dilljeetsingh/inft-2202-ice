import { ConflictError } from '../errors/ConflictError.js';
import { logger } from '../utils/logger.js'
 
 
export const ErrorHandlingMiddleware = (error, request, response, next) => {
    const { message, stack, statusCode = 500 } = error;
 
    const {body, params, query, orignalUrl, method, headers } = request;
 
    const time =  new Date().toISOString();
 
    const context = {
        time, 
        stack,
        reqeust: {
            method, path: orignalUrl, headers, query, body, params
        },
        response: {
            body: response.locals.data, statusCode: error.statusCode ?? 500}
    }
 
    const responseObj = {message}
    if (error instanceof ConflictError) {
        responseObj.errors = error.details?.errors;
    }
 
    logger.error(`${statusCode}: ${message}`, context);
    response.status(statusCode).send(responseObj);
 
};
 
