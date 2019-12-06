const express = require('express');
const routes = require('./routes');
const http = require('http')
const app = express();
const server = http.Server(app);

app.use(express.json())
app.use(routes);

server.listen(3000, () => {
    console.log('listen on 3000')
})