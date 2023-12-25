
const productModel = require("../models/productModel.js");

const categoryModel = require("../models/categoryModel.js");

const lincenceModel = require("../models/licenceModel.js");

const cuotaModel = require("../models/cuotasModel.js");

// valores por defecto

const cuotas_defaul = 6;

module.exports = {

  // table: Listado de Productos con Acciones
  admin: ( req, res ) => {

    let products = [];

    if( req.query.buscar ){

      const buscar = req.query.buscar.toUpperCase();
      
      for( const Product of productModel.listar() ){

        if( 
          Product.id == buscar || 
          Product.sku.toUpperCase() == buscar || 
          Product.name.toUpperCase() == buscar || 
          Product.Licence.name.toUpperCase() == buscar || 
          Product.Category.name.toUpperCase() == buscar  
        ){
          products.push( Product );
        }
      }
    }
    else{

      products = productModel.listar( req.query.buscar == undefined ? req.query : {} );
    }

    res.render( "products/admin", {

      iniciado: req.session.user,
      head: {

        title: "Administrador de Productos | Funkoshop",

        styles: [
          // elementos:
          "document/table",
          // página:
          "pages/products",
          "pages/products/admin"
        ],

        scripts:[
          "pages/products/admin"
        ]
      },

      products
         
    });
  },

  // form: Agregar 1 Producto
  create: ( req, res ) => {

    res.render( "products/create", {
      iniciado: req.session.user,
      
      head: {

        title: "Crear un Producto | Funkoshop",

        styles: [
          "pages/products",
          "pages/products/create"        
        ],

        scripts:[
          "pages/products/validate"
        ]
      },      

      // selectores
      categorys: categoryModel.listar(),
      licences: lincenceModel.listar(),
      cuotas: cuotaModel.listar(),
      
      cuotas_defaul

    });
  },

  // proceso: agregar 1 producto
  createProcess: ( req, res ) => {

    // obtener id secuencial...

    // agregar { } al archivo json...

  },

  // form: Modificar el Producto Seleccionado desde la Tabla
  edit: ( req, res ) => {

    res.render( "products/edit", {
      iniciado: req.session.user,
      head: {

        title: "Editar un Producto | Funkoshop",

        styles: [
          "pages",
          "pages/edit"        
        ],

        scripts:[
          "pages/validate"
        ]
      },
      
      // selectores
      categorys: categoryModel.listar(),
      licences: lincenceModel.listar(),
      cuotas: cuotaModel.listar(),

      cuotas_defaul,

      // productos
      Product: productModel.ver({ id: req.params.id })

    });
  },

  // proceso: ver y editar 1 producto
  editProcess: ( req, res ) => {

    // recorrer archivo json

    // editar archivo... 

  },

  // proceso: Eliminar el Producto Seleccionado desde la Tabla
  deleteProcess: ( req, res ) => {

    deleted_products = 0;

    res.send( deleted_products );
  }

};