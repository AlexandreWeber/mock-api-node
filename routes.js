const express = require('express')
const routes = express.Router();
const customersController = require('./controllers/customers');
const countriesController = require('./controllers/countries');

routes.get('/customers', customersController.query);
routes.get('/customers/:id', customersController.get);
routes.post('/customers', customersController.post);
routes.put('/customers/:id', customersController.update);
routes.delete('/customers/:id', customersController.delete);

routes.get('/countries', countriesController.query);
routes.get('/countries/:id', countriesController.get);
routes.post('/countries', countriesController.post);
routes.put('/countries/:id', countriesController.update);
routes.delete('/countries/:id', countriesController.delete);

module.exports = routes;
