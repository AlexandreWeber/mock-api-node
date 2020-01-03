const data = require('../data/countries');
const utils = require('../utils');

module.exports = {
	query(req, res) {
		let countries = utils.copyArray(data);
		const { pageSize = 20, page = 1, order, fields } = req.query;
		const queries = req.query;

		if (queries) {
			countries = utils.applyQueryFilter(countries, queries);
		}

		const countriesResponse = countries.slice((page - 1) * pageSize, pageSize * page);

		if (fields) {
			utils.applyFields(countriesResponse, fields);
		}

		if (order) {
			utils.applyOrder(countriesResponse, order);
		}

		const response = {
			items: countriesResponse,
			hasNext: countries.length > (page * pageSize),
			total: countriesResponse.length
		}

		return res.json(response);
	},

	get(req, res) {
		const id = req.params.id;
		const countries = data;

		console.log(id);

		const countryResponse = countries.find((c) => c.id.toUpperCase() === id.toUpperCase());

		return res.json(countryResponse);
	},

	post(req, res) {
		let country = req.body;
		const countries = data;

		country.id = country.code
		countries.push(country);

		utils.saveDatabase(countries, 'countries');

		return res.json(country)
	},

	update(req, res) {
		const id = req.params.id;
		const countries = data;

		const index = countries.findIndex((c) => c.id.toUpperCase() === id.toUpperCase());
		if (index === -1) {
			return res.status(400).json({error: `País não encontrado com o código ${id}`});
		}

		Object.keys(req.body).forEach((key) => {
			if (key.toUpperCase() !== "ID") {
				countries[index][key] = req.body[key];
			}
		});

		utils.saveDatabase(countries, 'countries');

		return res.json(countries[index])
	},

	delete(req, res) {
		const id = parseInt(req.params.id, 10);
		const countries = data;

		const index = countries.findIndex((c) => c.code === id);
		
		if (index === -1) {
			return res.status(400).json({error: `País não encontrado com o código ${id}`});
		}
		
		countries.splice(index, 1);

		utils.saveDatabase(countries, 'countries');

		return res.json({
			message: 'Cliente removido com sucesso'
		});
	},


}