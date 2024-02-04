const express = require('express');
const userRoutes = require('./userRoutes');

module.exports = (app) => {
  app.use(
    express.json(),
    userRoutes,
  );
};
