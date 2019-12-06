const fs = require('fs');
const path = require('path')

module.exports = {
    saveDatabase(countries, database) {
        console.log((path.resolve(__dirname, 'data', `${database}.json`)));
        fs.writeFile(path.resolve(__dirname, 'data', `${database}.json`), 
                     JSON.stringify(countries, null, 4), () => {});
    }
}