const express = require('express')
const routes = express.Router();
const customersController = require('./controllers/customers');
const countriesController = require('./controllers/countries');

routes.get('/customer', customersController.query);
routes.get('/customer/:id', customersController.get);
routes.post('/customer', customersController.post);
routes.put('/customer/:id', customersController.update);
routes.delete('/customer/:id', customersController.delete);

routes.get('/country', countriesController.query);
routes.get('/country/:id', countriesController.get);
routes.post('/country', countriesController.post);
routes.put('/country/:id', countriesController.update);
routes.delete('/country/:id', countriesController.delete);

module.exports = routes;
