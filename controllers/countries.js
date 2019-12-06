const data = require('../data/countries');
const utils = require('../utils');

module.exports = {
	query(req, res) {
        let countries = data;
        const pageSize = req.query.pageSize || 5;
        const page = req.query.page || 1;

        Object.keys(req.query).map((key) => {
            countries = countries.filter((c) => c[key].toUpperCase().includes(req.query[key].toUpperCase()));
        })
        
        const countriesResponse = countries.slice((page - 1) * pageSize, pageSize * page);
        
        const response = {
            items: countriesResponse,
            hasNext: countries.length > (page * pageSize),
            total: countriesResponse.length
        }

        return res.json(response);
    },
    
    get(req, res) {
        const id  = req.params.id;
        const countries = data;
        
        const countryResponse = countries.find((c) => c.id === id);
        
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
        const id  = req.params.id;
        const countries = data;
        
        let index = countries.findIndex((c) => c.id === id);

        countries[index].code = req.body.code;
        countries[index].name = req.body.code;

        utils.saveDatabase(countries, 'countries');

        return res.json(countries[index])
    },

    delete(req, res) {
        const id  = parseInt(req.params.id, 10);
        const countries = data;
        
        const index = countries.findIndex((c) => c.code === id);
        countries.splice(index, 1);

        utils.saveDatabase(countries, 'countries');

        return res.json({message: 'Cliente removido com sucesso'});
    },
    
   
}