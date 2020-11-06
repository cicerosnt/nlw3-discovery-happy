const express = require('express');
const path = require('path');
const pages = require('./pages.js');

//start/init the express
const server = express();

//define rout static
server.use(express.static('public'));

//template engine
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'hbs');

//use body do request
server.use(express.urlencoded({extend: true}));


//criandorotas
server.get('/', pages.index);
server.get('/orphanage', pages.orphanage);
server.get('/orphanages', pages.orphanages);
server.get('/create-orphanage', pages.create);
server.post('/save-orphanage', pages.saveOphanage);


//startar servidor
server.listen(5500);