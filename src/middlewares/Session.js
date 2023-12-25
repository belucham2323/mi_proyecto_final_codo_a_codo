
const session = require('express-session');

require('dotenv').config();

module.exports = { 
  
  // Iniciar la sesion
  init: session({ 
    secret: 'miSecretKey',// Una cadena utilizada para firmar la cookie de la sesión. Asegúrate de mantener esto de forma segura. 
    resave: true,// Evita que la sesión se guarde si no ha habido cambios.
    saveUninitialized: true // Evita que se cree una sesión hasta que algo se almacene.
  }),
  
  // copia sesion del usuario
  user: ( req, res, next ) => {

    // Middleware para pasar datos a todas las vistas
    res.locals.session_user = req.session.user ? req.session.user : 0;
  
    next();
  },

  // valida sesion del usuario
  isLog : ( req, res, next ) => {

    if ( req.session.user ) return next();
  
    return res.status(401).render("Error",{

      head: {
        title:"Acceso Restringido"
      },
      data:{
        detalle: "Acceso Restringido: solo Usuarios Autorizados..."
      }
    });
  },

  // Destruir la sesión
  destroy: ( req, res ) => {

    req.session.destroy( ( err ) => {
      
      !!err ? console.error(err) : res.redirect('/');
    });
  }
};