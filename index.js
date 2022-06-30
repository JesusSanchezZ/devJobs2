//import { create } from 'express-handlebars';

// Conexión a la BD
const mongoose = require('mongoose');
require('./config/db');

const express = require('express');
// habilitando handlebars como motor de plantillas
//const { engine, create } = require('express-handlebars');

const path = require('path');
const router = require('./routes/router');
// Paquetes para mantener sesión iniciada
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');              // require('')(session) Pasamos variables

const handlebars = require('handlebars');
const { create } = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// variables de entorno
require('dotenv').config({ path : 'variables.env' });

const app = express();

const exphbs = create({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    defaultLayout: 'main',
    helpers: require('./helpers/handlebars')
});

// habilitar handlebars como view
app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
//app.engine('handlebars', hbs.eengine);
//app.set('view engine', 'handlebars');
app.set('views','./views');

// Archivos Estáticos
app.use(express.static(path.join(__dirname, 'public' )));

app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,                                        // No almacena la sesión si no se modifica
    saveUninitialized: false,                             // No crea una sesión hasta que algo se almacena
    store: MongoStore.create({ mongoUrl : process.env.DATABASE })
}));

app.use('/', router());

app.listen(process.env.PUERTO);


/**
 * Instalación de paquetues para leer variables de entorno y conexión a la BD
 * npm i --save dotenv connect-mongo mongoose shortid slug express-session cookie-parser
 */