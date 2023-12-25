
/* creamos el servidor web */
const path = require("node:path");

const express = require("express");

/* importamos archivos de ruteos */

const mainRoutes = require('./src/routes/mainRoutes.js');
const shopRoutes = require('./src/routes/shopRoutes.js');
const productsRoutes = require('./src/routes/productsRoutes.js');
const userRoutes = require('./src/routes/userRoutes.js');

/* métodos para la Sesión */

const Session = require('./src/middlewares/Session.js');

/* variables globales */

require('dotenv').config();

/* pagina para erroes */
const Page = require("./src/middlewares/Page.js");

/* ejecutamos express para comenzar a usar sus metodos */

const app = express();

const PORT = process.env.PORT ?? 1234;

/* ------------------------------- */

/* parseo de datos recibidos por url */

// Configurar body-parser
app.use( express.urlencoded({ extended: true }) );

app.use( express.json() );

/* Carpeta de Arcvhiso Estáticos: css, img, js */

app.use( express.static( "public" ) );

/* Configuración del Motor de Vistas */

app.set( "view engine", "ejs" );

app.set( "views", path.join( __dirname, "src/views" ) );

/* ------------------------------- */

/* Inicio la Sesion y compio variables para vistas */

app.use( Session.init );

app.use( Session.user );

/* ------------------------------- */

/* Definición de Rutas */

app.use( '/', mainRoutes );

// exposición de productos y carrito de compras
app.use( '/shop', shopRoutes );

// abm de usuario ( admin )
app.use( '/user', userRoutes );

// abm de productos ( solo usuarios )
app.use( '/products', productsRoutes );

/* ------------------------------- */

// vista de página no encontrada
app.use( Page.notFound );


/* ------------------------------- */

// iniciamos el servicio
app.listen( PORT, () => console.log(`App ${new Date().getHours()}:${new Date().getMinutes()} ejecutándose en http://localhost:${PORT}`) )

/*  
  npm run dev
*/

