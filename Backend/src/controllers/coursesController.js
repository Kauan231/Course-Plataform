const Controller = require('./Controller')
const joi = require('joi');

const CreateSchema = joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    categories: joi.string().required()
});

const ReadSchema = joi.object().keys({
    title: joi.string().required()
});

const DeleteSchema = joi.object().keys({
    id: joi.string().required()
});

class coursesController extends Controller {
    constructor() {
        super('Course')
        this.createSchema = CreateSchema;
        this.readSchema = ReadSchema;
        this.deleteSchema = DeleteSchema;
    }
}

module.exports = coursesController;