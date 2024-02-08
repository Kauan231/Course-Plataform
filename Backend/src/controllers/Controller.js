const Models = require('../../models');
const Op = require('sequelize').Op;

class Controller {
    constructor(Model, CreateSchema, ReadSchema) {
        this.createSchema = CreateSchema;
        this.readSchema = ReadSchema;
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

    async Read(req, res) {
        try {
            await this.Validate(req.query, this.readSchema);
        } catch (err) {
            return res.status(400).json(
                { ...err.details }[0].message.split('"').join(''),
            );
        }

        try {
            //const foundItem = await Models[this.model].Find({where: { title: { [Op.ilike]: req.body.title } } });
            const foundItem = await Models[this.model].findOne({where: { title : req.query.title  } });
            res.status(201).json({
                status: 'success',
                message: 'found',
                data: { id: foundItem.dataValues.id, ...foundItem },
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