import Animal from '../../models/Animal.js';
import { checkSchema } from 'express-validator';
import { BadRequestError } from '../../errors/BadRequestError.js';

const rules = checkSchema({
    page: {
        isNumeric: {
            errorMessage: `"page" must be a Number!`
        }
    },
    perPage: {
        isNumeric: {
            errorMessage: `"perPage" must be a Number!`
        }
    }
}, ['query']);

const handle = async (request, response, next) => {
    try {
        const { page = 1, perPage = 5 } = request.query;

        // Validate page and perPage
        if (isNaN(page) || isNaN(perPage) || page <= 0 || perPage <= 0) {
            throw new BadRequestError('Invalid pagination parameters.');
        }

        const count = await Animal.countDocuments();
        const pages = Math.ceil(count / perPage);

        const pagination = {
            page: parseInt(page),
            perPage: parseInt(perPage),
            count,
            pages
        };

        const opts = {
            skip: (page - 1) * perPage,
            limit: perPage,
            sort: {
                createdAt: -1
            }
        };

        const records = await Animal.find({}, null, opts);

        response.json({ pagination, records });
    } catch (error) {
        next(error);
    }
};

export default { handle, rules };
