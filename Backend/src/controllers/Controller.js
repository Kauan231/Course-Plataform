const Op = require('sequelize').Op;
const Models = require('../../models');

class Controller {
    constructor(Model) {
        this.model = Model;
    }

    async Validate(data, schema) {
        await schema.validateAsync(data);
    }

    async Create(req, res) {
        try {
            await this.Validate( req.body, this.createSchema);
        } catch (err) {
            return res.status(400).json(
                { ...err.details }[0].message.split('"').join(''),
            );
        }
    
        try {
            const registeredItem = await Models[this.model].create(req.body);
            return res.status(201).json({
                status: 'success',
                message: 'resource created',
                data: { id: registeredItem.dataValues.id, ...req.body },
            });
        } catch (err) {
            return res.status(500).json({
                ...err,
            });
        }
    }

    async ReadByTitle(req, res) {
        try {
            await this.Validate(req.query, this.readByTitleSchema);
        } catch (err) {
            return res.status(400).json(
                { ...err.details }[0].message.split('"').join(''),
            );
        }
        
        try {
            const foundItem = await Models[this.model].findAll({ where: { title: { [Op.like]: `${req.query.title}%` } } });
            
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

    async ReadById(req, res) {
        try {
            await this.Validate(req.params, this.readByIdSchema);
        } catch (err) {
            return res.status(400).json(
                { ...err.details }[0].message.split('"').join(''),
            );
        }
        
        try {
            const foundItem = await Models[this.model].findAll({ where: { id: req.params.id} });
            
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

    async ReadAll(req, res) {
        try {
            const foundItem = await Models[this.model].findAll();
            
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
    

    async Delete(req, res) {
        try {
            await this.Validate(req.params, this.deleteSchema);
        } catch (err) {
            return res.status(400).json(
                { ...err.details }[0].message.split('"').join(''),
            );
        }

        try {
            const deletedItem = await Models[this.model].destroy({ where: { id: req.params.id } });
            
            if(deletedItem){
                return res.status(204).json({
                    status: 'success',
                    message: 'Resource removed',
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

module.exports = Controller;
