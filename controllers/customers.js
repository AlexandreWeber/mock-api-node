const data = require('../data/customers');
const utils = require('../utils');

module.exports = {
	query(req, res) {
		const customers = utils.copyArray(data);
		const { pageSize = 20, page = 1, order, fields, queries } = req.query;

		if (queries) {
			customers = utils.applyQueryFilter(customers, queries);
		}

		const customersResponse = customers.slice((page - 1) * pageSize, pageSize * page);

		if (fields) {
			utils.applyFields(customersResponse, fields);
		}

		if (order) {
			utils.applyOrder(customersResponse, order);
		}

		const response = {
			items: customersResponse,
			hasNext: customers.length > (page * pageSize),
			total: customersResponse.length
		}

		return res.json(response);
	},

	get(req, res) {
		const id = parseInt(req.params.id, 10);
		const customers = data;

		const customerResponse = customers.find((c) => c.code === id);

		return res.json(customerResponse);
	},

	post(req, res) {
		let customer = req.body;
		let maxCode = 0;
		const customers = data;
		const maxCode = Math.max(...customers);
		
		customer.code = maxCode + 1;
		customer.id = `${customer.company};${customer.code}`;

		customers.push(customer);

		utils.saveDatabase(customers, 'customers');

		return res.json(customer)
	},

	update(req, res) {
		const id = parseInt(req.params.id, 10);
		const customers = data;

		const index = customers.findIndex((c) => c.code === id);

		if (index === -1) {
			return res.status(400).json({error: `Cliente não encontrado com o código ${id}`});
		}

		Object.keys(req.body).forEach((key) => {
			if (key.toUpperCase() !== "ID" && key.toUpperCase() !== "CODE") {
				customers[index][key] = req.body[key];
			}
		});

		utils.saveDatabase(customers, 'customers');

		return res.json(customers[index])
	},

	delete(req, res) {
		const id = parseInt(req.params.id, 10);
		const customers = data;

		const index = customers.findIndex((c) => c.code === id);
		
		if (index === -1) {
			return res.status(400).json({error: `Cliente não encontrado com o código ${id}`});
		}

		customers.splice(index, 1);

		utils.saveDatabase(customers, 'customers');

		return res.json({
			message: 'Cliente removido com sucesso'
		});
	},
}