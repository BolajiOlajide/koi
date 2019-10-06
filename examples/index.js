'use strict';

const express = require('express');
const koii = require('../src');
const routes = require('./routes')

const app = express();
const PORT = 3103;

const responseHandler = ({ message }) => (req, res) => {
  if (req.params && req.params.name) {
    message = `${message}${req.params.name}`;
  }

  return res.send({
    status: 'success',
    message
  });
};

app.get('/', responseHandler({ message: 'Sample express application' }));
app.get('/names/:name', responseHandler({ message: 'Welcome ' }));
app.post('/names/:name', responseHandler({ message: 'Welcome ' }));
app.route('/events')
  .get(responseHandler({ message: 'Get Events' }))
  .post(responseHandler({ message: 'Post Events' }))
  .put(responseHandler({ message: 'Put Events' }));

app.use('/api/v1', routes);
app.use(koii);
app.get('/job', (req, res) => {
  console.log(req.query.skills)
  return res.status(203).send('jdjs');
})

app.listen(PORT, (err) => {
  if (err) {
    throw new Error(err.message);
  }

  console.log('Application running on port ' + PORT); // eslint-disable-line
});
