const fs = require('fs');
const path = require('path')

module.exports = {
    saveDatabase(data, database) {
        fs.writeFile(path.resolve(__dirname, 'data', `${database}.json`), 
                     JSON.stringify(data, null, 4), () => {});
    }
}   