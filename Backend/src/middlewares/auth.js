const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
  const jwtToken = req.headers.authorization;
  jwt.verify(jwtToken, process.env.SECRET_JWT, (err, userInfo) => {
    if (err) {
      res.status(403).end();
      return;
    }
    req.userInfo = userInfo;
    next();
  });
}

module.exports = auth;
