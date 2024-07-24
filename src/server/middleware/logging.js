import { logger } from '../utils/logger.js';

export const LoggingMiddleware = (request, response, next) => {

   logRequest(request, response);
   response.once('finish', () => logRequest(request, response));
   next();

}
const logRequest = async (request, response) => {
    const {body, params, query, method, headers, originalUrl, path} = request;
    const {statusCode} = response;
    const time = new Date().toISOString();
    
    const og = response.json;

    response.json = async (value) => {
        const data = await Promise.resolve(value);
        response.locals.data = data;
        return og.call(response, data);
    }
           
    const {data} = response.locals;
    const context = {
        time,
        request: {
            body,
            params,
            query,
            headers
        },
        response: {
            body: response.locals.data,
            statusCode
        }
    }

    if(response.headerSent) {
        logger.info(`RESPONSE ${statusCode}: ${method} ${originalUrl}`, context);
    
    }else {
        logger.info(`REQUEST: ${method} ${originalUrl}`, context);
    }
    logger.info(`${method} ${path}`, context);

}


