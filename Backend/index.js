/* eslint-disable prefer-template */
require('dotenv').config();
const app = require('./src/app.js');

app.listen(process.env.PORT, () => {
  console.log('Listening on: ' + process.env.PORT);
});
