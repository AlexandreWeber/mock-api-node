const fs = require('fs');
const path = require('path')

module.exports = {
	saveDatabase(data, database) {
		fs.writeFile(path.resolve(__dirname, 'data', `${database}.json`),
			JSON.stringify(data, null, 4), () => {});
	},

	copyArray(list) {
		return JSON.parse(JSON.stringify(list));
	},

	applyOrder(list, field) {
		const isDesc = field.startsWith('-');

		field = field.replace('-', '');

		list.sort((a, b) => {
			if (a[field] > b[field]) {
				return isDesc ? -1 : 1;
			}
			if (a[field] < b[field]) {
				return isDesc ? 1 : -1;
			}

			return 0;
		});
	},

	applyFields(list, fields) {
		const listOfFields = fields.split(',');

		list.forEach((value) => {
			Object.keys(value).forEach((key) => {
				if (!listOfFields.includes(key)) {
					delete value[key];
				}
			});
		});
	},

	applyQueryFilter(list, query) {
		let filteredList = list;

		Object.keys(query).forEach((key) => {
			if (key !== 'pageSize' && key !== 'page' && key !== 'fields' && key !== 'order') {
				filteredList = filteredList.filter((item) => {
					if (typeof (item[key]) === 'string') {
						return item[key].toUpperCase().includes(query[key].toUpperCase());
					} else {
						return item[key] == query[key];
					}
				});
			}
		});

		return filteredList;
	}
}
