
module.exports = {

  notFound: ( req, res ) => res.status(404).render( "error", { 
    
    head:{ title: "Error 404", },

    data: { titulo: "Error 404", detalle: "No Existe la página solicitada..." }

   })
}