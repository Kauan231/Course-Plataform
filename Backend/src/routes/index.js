const express = require('express');
const userRoutes = require('./userRoutes');
const coursesRoutes = require('./coursesRoutes')
const lessonsRoutes = require('./lessonsRoutes')

module.exports = (app) => {
  app.use(
    express.json(),
    userRoutes,
    coursesRoutes,
    lessonsRoutes,
  );
};
