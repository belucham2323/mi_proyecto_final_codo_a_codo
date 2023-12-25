
const fs = require("node:fs");
const path = require("path");

const Valor = require("../utils/Valor.js")

let users = JSON.parse( fs.readFileSync(path.join(__dirname,"../data/users.json"), "utf-8") );

module.exports = {

  ver : ( filtros = {} ) => {   

    let listado = Valor.filtrar( users, filtros );

    if( listado[0] ) return (listado[0]);
  },
  
  listar : ( filtros ) => {

    let listado = Valor.filtrar( users, filtros );
  
    for( const User in listado ){      
  
      listado[User] = (listado[User]);
    }
  
    return listado;
  },
  saveUsers:(usersnew)=>{
    users = usersnew;
    fs.writeFileSync(path.join(__dirname,"../data/users.json"),JSON.stringify(usersnew), "utf-8");
  }
};