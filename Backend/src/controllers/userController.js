const jwt = require('jsonwebtoken');
const joi = require('joi');
const { randomBytes, scryptSync, timingSafeEqual } = require('crypto');
const Models = require('../../models');
const Op = require('sequelize').Op;

function SaltAndHash(password) {
  const salt = randomBytes(16).toString('hex');
  const hashedPassword = scryptSync(password, salt, 64).toString('hex');
  return { hashedPassword, salt };
}

function VerifyPassword(password, hash, salt) {
  const testHash = scryptSync(password, salt, 64);
  const realHash = Buffer.from(hash, 'hex');
  const auth = timingSafeEqual(testHash, realHash);
  return auth;
}

class userController {
  async Register(req, res) {
    const data = req.body;
    const schema = joi.object().keys({
      email: joi.string().email().required(),
      username: joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      firstname: joi.string().required(),
      lastname: joi.string().required(),
      password: joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    });

    try {
      await schema.validateAsync(data);
    } catch (err) {
      return res.status(400).json(
        { ...err.details }[0].message.split('"').join(''),
      );
    }

    try {
      const HashResult = SaltAndHash(data.password);
      const userWithHash =  { ...req.body, hash: HashResult.hashedPassword, salt: HashResult.salt };
      
      const [ registeredUser, created ] = await Models.User.findOrCreate({
        where: {
          [Op.or]: [{
            username: data.username
          }, {
            email: data.email
          }]
        },
        defaults: 
          {
            ...userWithHash
          }
      });

      if(!created) {
        if(registeredUser.email == data.email) {
          return res.status(409).json({
            status: 'error',
            message: 'Email already in use',
          })
        }

        if(registeredUser.username == data.username) {
          return res.status(409).json({
            status: 'error',
            message: 'Username already in use',
          })
        }
      }

      const Token = jwt.sign({ id: registeredUser.dataValues.id }, process.env.SECRET_JWT, {
        expiresIn: '5 days',
      });
      delete data.password;
      return res.status(201).json({
        status: 'success',
        message: 'resource created',
        data: { id: registeredUser.dataValues.id, ...data },
        auth: true,
        token: Token,
      });
    } catch (err) {
      return res.status(500).json({
        ...err,
      });
    }
  }

  async Login(req, res) {
    const data = req.body;
    const schema = joi.object().keys({
      username: joi.string()
        .alphanum()
        .min(3)
        .max(30),
      email: joi.string().email(),
      password: joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    }).xor('username', 'email');

    try {
      await schema.validateAsync(data);
    } catch (err) {
      return res.status(400).json(
        { ...err.details }[0].message.split('"').join(''),
      );
    }

    try {
      let user;
      if (!data.username) {
        user = await Models.User.findOne({ where: { email: data.email } });
      } else {
        user = await Models.User.findOne({ where: { username: data.username } });
      }
      const authenticated = VerifyPassword(data.password, user.dataValues.hash, user.dataValues.salt);
      if (authenticated) {
        const Token = jwt.sign({ id: user.dataValues.id }, process.env.SECRET_JWT, {
          expiresIn: '5 days',
        });

        return res.status(201).json({
          status: 'success',
          message: 'login successful',
          data: { id: user.dataValues.id },
          auth: true,
          token: Token,
        });
      } else {
        return res.status(400).json({
          status: 'error',
          message: 'incorrect password',
          auth: false,
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: 'Cannot find user',
        auth: false,
      });
    }
  }

  Logout(req, res) {
    return res.json({
      auth: false,
      token: null,
    });
  }
}
module.exports = userController;
