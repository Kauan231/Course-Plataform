const Controller = require('./Controller')
const Models = require('../../models');
const joi = require('joi');

const CreateSchema = joi.object().keys({
    userid: joi.string().required(),
    courseid: joi.string().required(),
});

const DeleteSchema = joi.object().keys({
    userid: joi.string().required(),
    courseid: joi.string().required(),
});

const ReadSchema = joi.object().keys({
    userid: joi.string().required()
});

class enrollController extends Controller {
    constructor() {
        super('Course_Enroll')
        this.createSchema = CreateSchema;
        this.readSchema = ReadSchema;
        this.deleteSchema = DeleteSchema;
    }

    async Read(req, res){
        try {
            await this.Validate(req.params, this.readSchema);
        } catch (err) {
            return res.status(400).json(
                { ...err.details }[0].message.split('"').join(''),
            );
        }

        try {
            const foundItem = await Models.User.findOne({
                where: { id: req.params.userid },
                include: Models.Course,
            })
            
            if(foundItem) {
                return res.status(201).json({
                    status: 'success',
                    message: 'found',
                    data: {...foundItem.Courses} ,
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

    async Delete(req, res) {
        try {
            await this.Validate(req.params, this.deleteSchema);
        } catch (err) {
            return res.status(400).json(
                { ...err.details }[0].message.split('"').join(''),
            );
        }

        try {
            const foundItem = await Models[this.model].destroy({
                where: { userid: req.params.userid, courseid: req.params.courseid }
            })
            
            if(foundItem) {
                return res.status(201).json({
                    status: 'success',
                    message: 'unenrolled',
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

module.exports = enrollController;