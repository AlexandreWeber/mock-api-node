const data = require('../data/customers');
const utils = require('../utils');

module.exports = {
	query(req, res) {
        let customers = data;
        const pageSize = req.query.pageSize || 10;
        const page = req.query.page || 1;
        
        Object.keys(req.query).map((key) => {
			if (key !== 'pageSize' && key !== 'page' && key !== 'fields' && key !== 'order') {
				customers = customers.filter((c) => c[key].toUpperCase().includes(req.query[key].toUpperCase()));
			}
        })

        const customersResponse = customers.slice((page - 1) * pageSize, pageSize * page);
        
        const response = {
            items: customersResponse,
            hasNext: customers.length > (page * pageSize),
            total: customersResponse.length
        }

        return res.json(response);
    },
    
    get(req, res) {
        const id  = parseInt(req.params.id, 10);
        const customers = data;
        
        const customerResponse = customers.find((c) => c.code === id);
        
        return res.json(customerResponse);
    },

    post(req, res) {
        let customer = req.body;
        let maxCode = 0;
        const customers = data;

        customers.map((c) => {
            if (c.code > maxCode) {
                maxCode = c.code;
            }
        });
        
        customer.code = maxCode + 1;
        customer.id = `${customer.company};${customer.code}`;

        customers.push(customer);

        utils.saveDatabase(customers, 'customers');
        
        return res.json(customer)
    },

    update(req, res) {
        const id  = parseInt(req.params.id, 10);
        const customers = data;
        
        let index = customers.findIndex((c) => c.code === id);

        customers[index].company = req.body.company;
        customers[index].shortName = req.body.shortName;
        customers[index].name = req.body.name;
        customers[index].country = req.body.country;
        customers[index].status = req.body.status;

        utils.saveDatabase(customers, 'customers');

        return res.json(customers[index])
    },

    delete(req, res) {
        const id  = parseInt(req.params.id, 10);
        const customers = data;
        
        const index = customers.findIndex((c) => c.code === id);
        customers.splice(index, 1);

        utils.saveDatabase(customers, 'customers');

        return res.json({message: 'Cliente removido com sucesso'});
    },
}