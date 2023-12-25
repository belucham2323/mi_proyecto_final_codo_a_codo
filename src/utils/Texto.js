
module.exports = {

  exp: ( codigo, opciones ) => {
 
    return new RegExp( codigo, opciones && Array.isArray(opciones) ? opciones.join('') : null );
  },

  dec: ( texto ) => {

    // $& significa toda la cadena coincidente
    return texto.toString().replace(/[.*+\-?^${}()|[\]\\]/g,'\\$&');
  }
}