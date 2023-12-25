
const fs = require("node:fs");

const Valor = require("../utils/Valor.js")

const licences = JSON.parse( fs.readFileSync("./src/data/licences.json", "utf-8") );

module.exports = {  

  ver : ( filtros = {} ) => {

    let listado = Valor.filtrar( licences, filtros );

    if( listado[0] ) return (listado[0]);
  },
  
  listar : ( filtros ) => {
  
    let listado = Valor.filtrar( licences, filtros );
  
    for( const licence in listado ){
  
      listado[licence] = listado[licence];
    }
  
    return listado;
  }
};