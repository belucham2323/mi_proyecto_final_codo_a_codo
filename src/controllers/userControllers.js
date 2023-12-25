
const bcrypt = require("bcrypt");

const userModel = require("../models/userModel.js");

module.exports = {

  // form: 
  login: ( req, res ) => {
    let iniciado=false;
    if(req.session.hasOwnProperty("user"))iniciado=true;
    // console.log("req.session.user: ",req.session.user);
    res.render( "user/login", { 
      iniciado,
      head: {

        title: "Login | Funkoshop",

        styles: [
          "pages/user",
          "pages/user/login"
        ],

        scripts:[
          "pages/user/login"
        ]
      }

     });
    // console.log(locals.session_user);

  },

  // proceso: validar e iniciar sesión
  loginProcess : ( req, res ) => {

    const { email, password } = req.body;

    const User = userModel.ver({ email });
    console.log(User);
    if( User ) {

      // hasheo password recibido y comparo con el guardado: 1234

      if( bcrypt.compareSync( password, User.password ) ){

        // cargo usuario en sesion
        req.session.user = User.id;

        return res.redirect('/products');
      }

      return res.status(401).render("error",{
        
        head: { 
          title: "Login"
        },
        data:{
          detalle: 'Password Incorrecto...'
        }        
      });
    }

    return res.status(401).render("error",{
      head: { 
        title: "Login"
      },
      data:{
        detalle: 'Usuario Inexistente...'
      }      
    });
  },

  // proceso: cerrar sesión
  logOutProcess : ( req, res ) => {

    delete(req.session.user);

    req.session.destroy( ( err ) => {
      
      !!err ? console.error(err) : res.redirect('/');
    });
  },

  // form: registro
  register: ( req, res ) => {
    let iniciado=false;
    if(req.session.hasOwnProperty("user"))iniciado=true;
    res.render("user/register", { 
      iniciado:iniciado,
      head: {

        title: "Registrarse | Funkoshop",

        styles: [
          "pages/user",
          "pages/user/register"            
        ],

        scripts:[
          "pages/user/validate"
        ]
      }
    });
  },

  // proceso: registrar el usuario
  registerProcess: ( req, res ) => {
    let listUsers = userModel.listar();
    // valores del form
    console.log(listUsers);
    User = req.body;
    console.log(User);
    // hashear el password:
    User.password = bcrypt.hashSync( User.password, 5 );
    if(listUsers.find((x)=>x.email==User.email)==undefined){
      listUsers.push({
        id: listUsers.length+1,
        name: User.name,
        lastName: User.lastName,
        email: User.email,
        password: User.password
      });
      userModel.saveUsers(listUsers);
      res.json({msg:"mail registrado con exito"});
    }else{
      res.json({msg:"no se pudo porque ya existe el email registrado"});
    }
    // ...guardar los datos
    // res.json({msg:"recibido"});
    // res.json({msg:"ya existe el dato"});
    // userModel.
  }
}

