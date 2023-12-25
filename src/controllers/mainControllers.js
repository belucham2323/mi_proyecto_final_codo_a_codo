
const productModel = require("../models/productModel.js");
let {listaMensajes, saveMensajes} = require("../models/mensajesModel.js");
const collectionModel = require("../models/collectionModel.js")

module.exports = {

  home: ( req, res ) => {
    // let iniciado=checkSession(req.session.iniciado);
    let iniciado=false;
    res.render( "home", { 
      sesion: req.session,
      iniciado: iniciado,
      head: {

        title: "Home | Funkoshop",
      
        styles: [
          "components/hero",
          "components/collection",
          "components/slider"
        ],

        scripts: [ 
          "components/slider",
          "sesion/checkSesion"
        ]
      },

      // colecciones
      collections: collectionModel.listar([ ['id','<>',4] ]),

      // slider
      products_title: "Últimos Lanzamientos...",
      products_list: productModel.listar([ ['is_new','==',true] ])
    })
  },

  contact: ( req, res ) => {
    let iniciado=false;
    // res.send(`Vista de Contacto`);
    // console.log(listaMensajes);
    res.render( "contact", {
      iniciado: iniciado,
      head:{
        title: "Contacto | Funkoshop",
        styles: [
          "pages/contact",
          "components/hero",
          "components/collection"
        ],
        scripts: [ 
          "pages/sendForm"
        ]
      }
      
    });
  },
  contactPost: ( req, res ) => {
    console.log(req.body);
    listaMensajes.push(req.body);
    res.json({dato:saveMensajes()});
  }

}