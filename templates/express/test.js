const config = require('../../config');

module.exports = function() {
  return `module.exports = function(app) {
app.get('/test', function(req, res) {
  res.send('Response for GET /test');
});

app.get('/test/query', function(req, res) {
  const query = req.query.test;
  res.send(\`Response for GET /test/query?test=\${query}, query: \${query}\`);
});

app.get('/test/path/:test', function(req, res) {
  const pathParam = req.params.test;
  res.send(\`Response for GET /test/path/:test, path value: \${pathParam}\`);
});

app.post('/test', function(req, res) {
  res.send(\`Response for POST /test, body.test = \${req.body.test}\`);
});

app.post('/test/returnObject', function(req, res) {
  res.send(req.body);
});
}
`;
}