const config = require('../../config');

module.exports = function(name) {
  return `const express = require('express');
const cors = require('cors');
const app = express();
const port = ${config.express.port};

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

require('./test.js')(app);

app.listen(port, () => {
  console.log('Express server for ${name} listening on http://localhost:${config.express.port}');
})
`;
}