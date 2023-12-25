
const fs = require("node:fs");

const Valor = require("../utils/Valor.js");

const categorys = JSON.parse( fs.readFileSync("./src/data/categorys.json", "utf-8") );

module.exports = {

  ver : ( filtros = {} ) => {

    let listado = Valor.filtrar( categorys, filtros );

    if( listado[0] ) return (listado[0]);
  },
  
  listar : ( filtros ) => {
  
    return Valor.filtrar( categorys, filtros );
  }

};