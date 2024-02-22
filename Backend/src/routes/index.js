const express = require('express');
const cors = require('cors');
const userRoutes = require('./userRoutes');
const coursesRoutes = require('./coursesRoutes')
const lessonsRoutes = require('./lessonsRoutes')

module.exports = (app) => {
  app.use(
    express.json(),
    cors(),
    userRoutes,
    coursesRoutes,
    lessonsRoutes,
  );
};
