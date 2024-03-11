const Controller = require('./Controller')
const joi = require('joi');

const CreateSchema = joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    categories: joi.string().required()
});

const ReadByTitleSchema = joi.object().keys({
    title: joi.string().required()
});

const ReadByIdSchema = joi.object().keys({
    id: joi.number().integer().options({ convert: true }).required()
});

const DeleteSchema = joi.object().keys({
    id: joi.number().integer().options({ convert: true }).required()
});

class coursesController extends Controller {
    constructor() {
        super('Course')
        this.createSchema = CreateSchema;
        this.readByTitleSchema = ReadByTitleSchema;
        this.readByIdSchema = ReadByIdSchema;
        this.deleteSchema = DeleteSchema;
    }
}

module.exports = coursesController;