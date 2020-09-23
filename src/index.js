const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const { mongoose } = require('./database');

// Configuracion 
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/tasks', require('./routes/task.routes'));

// Archivos estaticos
// Este módulo busca la carpeta public, para encontrar el index.html
app.use(express.static(path.join(__dirname, 'public')))

// Inicio del servidor
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});