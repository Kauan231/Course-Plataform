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
            await this.Validate(req.body, this.createSchema);
        } catch (err) {
            return res.status(400).json(
                { ...err.details }[0].message.split('"').join(''),
            );
        }
    
        try {
            const registeredItem = await Models[this.model].create({ ...req.body });
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

    async Read(req, res, args) {
        try {
            await this.Validate(req.query, this.readSchema);
        } catch (err) {
            return res.status(400).json(
                { ...err.details }[0].message.split('"').join(''),
            );
        }
        
        try {
            const foundItem = await Models[this.model].findAll({ where: { ...args } });
            
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
            await this.Validate(req.body, this.deleteSchema);
        } catch (err) {
            return res.status(400).json(
                { ...err.details }[0].message.split('"').join(''),
            );
        }

        try {
            const deletedItem = await Models[this.model].destroy({ where: { id: req.body.id } });
            
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
