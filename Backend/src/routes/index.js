const express = require('express');
const userRoutes = require('./userRoutes');
const coursesRoutes = require('./coursesRoutes')

module.exports = (app) => {
  app.use(
    express.json(),
    userRoutes,
    coursesRoutes,
  );
};
