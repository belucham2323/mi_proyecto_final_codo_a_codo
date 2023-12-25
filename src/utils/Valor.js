
const Texto = require("./Texto.js");

/* Proceso Valor */

const Valor = {

  /* Comparación de Valores */

  comparar : ( valor_1, operador, valor_2, RegExpOpcion = ['g','i'] ) => {

    let result = false;
    
    switch( operador ){
    case '===': result = ( valor_1 === valor_2 );  break;
    case '!==': result = ( valor_1 !== valor_2 );  break;
    case '=':   
    case '==':  result = ( valor_1 ==  valor_2 );  break;
    case '<>':  
    case '!=':  result = ( valor_1 !=  valor_2 );  break;          
    case '>':   result = ( valor_1  >  valor_2 );  break;
    case '<':   result = ( valor_1  <  valor_2 );  break;
    case '>=':  result = ( valor_1 >=  valor_2 );  break;
    case '<=':  result = ( valor_1 <=  valor_2 );  break;
    case '^^':  result = Texto.exp(`^${Texto.dec(valor_2)}`, RegExpOpcion ).test( valor_1.toString() ); break;
    case '!^':  result = Texto.exp(`^[^${Texto.dec(valor_2)}]`, RegExpOpcion ).test( valor_1.toString() ); break;
    case '$$':  result = Texto.exp( `${Texto.dec(valor_2)}$`, RegExpOpcion ).test( valor_1.toString() ); break;
    case '!$':  result = Texto.exp( `[^${Texto.dec(valor_2)}]$`, RegExpOpcion ).test( valor_1.toString() ); break;
    case '**':  result = Texto.exp( `${Texto.dec(valor_2)}`, RegExpOpcion ).test( valor_1.toString() ); break;
    case '!*':  result = Texto.exp( `[^${Texto.dec(valor_2)}]`, RegExpOpcion ).test( valor_1.toString() ); break;
    }
    
    return result;
  },
  
  /* Proceso Filtros de Lista */
  
  filtrar : ( listado = [], filtros = [], operador = "&&", comparador = "==" ) => {
  
    let resultado = [];
  
    if( Array.isArray(filtros) ){
  
      for( const Objeto of listado ){

        let comparacion = true;

        for( const filtro of filtros ){
  
          if( filtro[0] == undefined || Objeto[filtro[0]] == undefined || !Valor.comparar( Objeto[filtro[0]], filtro[1], filtro[2] ) ){
  
            comparacion = false;

            break;            
          }
        }

        if( comparacion ) resultado.push(Objeto);
      }
    }
    else if( typeof(filtros) == 'object' ){

      for( const Objeto of listado ){

        let comparacion = true;

        for( const propiedad in filtros ){
  
          if( Objeto[propiedad] == undefined || !Valor.comparar( Objeto[propiedad], comparador, filtros[propiedad] ) ){

            comparacion = false;

            break;
          }
        }

        if( comparacion ) resultado.push(Objeto);
      }
    }      
  
    return resultado;
  }

};

module.exports = Valor;