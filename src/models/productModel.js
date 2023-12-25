
const fs = require("node:fs");

const Valor = require("../utils/Valor.js")

const licenceModel = require("./licenceModel.js");

const categoryModel = require("./categoryModel.js");

const cuotasModel = require("./cuotasModel.js");

/* Cargo archivo completo */

const products = JSON.parse( fs.readFileSync("./src/data/products.json", "utf-8") );

/* cargo objetos relacioados */

function cargar_relaciones ( Product ) {

  Product.Licence = licenceModel.ver({ id: Product.licence });

  Product.Category = categoryModel.ver({ id: Product.category });

  Product.Cuotas = cuotasModel.ver({ id: Product.cuotas });

  return Product;
};

/* proceso productos */

module.exports = { 

  ver : ( filtros ) => {

    let listado = Valor.filtrar( products, filtros );

    if( listado[0] ) return cargar_relaciones(listado[0]);
  },
  
  listar : ( filtros ) => {    
  
    let listado = Valor.filtrar( products, filtros );
  
    for( const product in listado ){      
  
      listado[product] = cargar_relaciones(listado[product]);
    }
  
    return listado;
  }
  
};