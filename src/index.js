const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql2')
const myConnection = require('express-myconnection')

const app = express();
app.use(express.urlencoded({ extended: false }));

// importar rutas
const appRoutes = require('./routes/app.js');
const clientesRoutes = require('./routes/clientes.js');
const categoriasRoutes = require('./routes/categorias.js');
const articulosRoutes = require('./routes/articulos.js');

// Definición de listas
const categorias = [];

// Settings
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));

// middleware
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'kerumueblesnjs'
}))


// routes
app.use('/', appRoutes);
app.use('/', clientesRoutes);
app.use('/', categoriasRoutes);
app.use('/', articulosRoutes);


//static files
app.use(express.static(path.join(__dirname, 'public')));


// Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log("Server in port 5000")
})
