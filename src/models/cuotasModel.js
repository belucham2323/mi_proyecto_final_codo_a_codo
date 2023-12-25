
const fs = require("node:fs");

const Valor = require("../utils/Valor.js")

const cuotas = JSON.parse( fs.readFileSync("./src/data/cuotas.json", "utf-8") );

module.exports = {

  ver : ( filtros = {} ) => {

    let listado = Valor.filtrar( cuotas, filtros );

    if( listado[0] ) return (listado[0]);
  },
  
  listar : ( filtros ) => {
  
    return Valor.filtrar( cuotas, filtros );
  }
};