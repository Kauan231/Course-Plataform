const Controller = require('./Controller')
const Models = require('../../models');
const joi = require('joi');

const CreateSchema = joi.object().keys({
    title: joi.string().required(),
    courseid: joi.string().required(),
    video:joi.string(),
    description: joi.string().required()
});

const ReadByTitleSchema = joi.object().keys({
    title: joi.string().required()
});

const ReadByIdSchema = joi.object().keys({
    courseid: joi.string().required()
});

const DeleteSchema = joi.object().keys({
    id: joi.string().required()
});

class lessonController extends Controller {
    constructor() {
        super('Lesson')
        this.createSchema = CreateSchema;
        this.readByTitleSchema = ReadByTitleSchema;
        this.readByIdSchema = ReadByIdSchema;
        this.deleteSchema = DeleteSchema;
    }

    async ReadById(req, res) {
        try {
            await this.Validate(req.params, this.readByIdSchema);
        } catch (err) {
            return res.status(400).json(
                { ...err.details }[0].message.split('"').join(''),
            );
        }
        
        try {
            const foundItem = await Models[this.model].findAll({ where: { courseid: req.params.courseid} });
            
            if(foundItem.length > 0){
                return res.status(201).json({
                    status: 'success',
                    message: 'found',
                    data: {...foundItem },
                });
            }
            
            return res.status(404).json({
                status: 'error',
                message: 'resource not found'
            });
        } catch (err) {
            console.log(err); 
            res.status(500).json({
                ...err,
            });
        }
    }
}

module.exports = lessonController;