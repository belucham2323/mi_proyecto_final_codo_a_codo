
const productModel = require("../models/productModel.js");

const cartModel = require("../models/cartModel.js");
let cantidad_usuarios_sin_registrarse=0;
module.exports = {

  // listado de Productos
  products: ( req, res ) => {
    if(req.params.hasOwnProperty("0"))req.params["pag"]=req.params["0"];
    // procesar filtros de la pantalla
    let products = [];
    let iniciado = false;
    if(req.session.hasOwnProperty("user"))iniciado = true;
    // console.log(req.params);
    console.log(req.query);
    let Operador = {ordenar:"A-Z"};
    // const Operador = {};
    
    // const Names = [ 'buscar', 'ordenar', 'precio_minimo', 'precio_maximo', 'nuevo', 'oferta', 'especial', 'favoritos'];
    // for( const name of Names){ 
    //   console.log("linea 18");
    //   console.log(req.query[name]);

    //   if( req.query[name] != undefined ) Operador[name] = req.query[name]; 
    // }

    // if( Object.keys(Operador).length ){

    //   // filtros:
    //   let producto_valido;

    //   if( Operador.precio_minimo ) Number(Operador.precio_minimo);

    //   if( Operador.precio_maximo ) Number(Operador.precio_maximo);

    //   for( const Product of productModel.listar() ){        

    //     producto_valido = true;

    //     if( !!Operador.buscar && 
    //       !(
    //       Operador.buscar.toLowerCase() == Product.name.toLowerCase() || 
    //       Operador.buscar.toLowerCase() == Product.Category.name.toLowerCase() || 
    //       Operador.buscar.toLowerCase() == Product.Licence.name.toLowerCase() 
    //       ) 
    //     ){
    //       producto_valido = false;
    //     }
  
    //     if( producto_valido && Operador.nuevo && !Product.is_new ) producto_valido = false;
    //     if( producto_valido && Operador.oferta && !Product.is_ofert ) producto_valido = false;
    //     if( producto_valido && Operador.especial && !Product.is_limited ) producto_valido = false;
    //     if( producto_valido && Operador.favoritos && !Product.is_favorite ) producto_valido = false;
    //     if( producto_valido && Operador.precio_minimo && Product.price < Operador.precio_minimo ) producto_valido = false;
    //     if( producto_valido && Operador.precio_maximo && Product.price > Operador.precio_maximo  ) producto_valido = false;
    //     if( producto_valido ) products.push(Product);
    //   }      

    //   // Ordenamiento de Resultados:
    //   if( Operador.ordenar ){

    //     let comparacion = 0;

    //     switch( Operador.ordenar ){
    //     case 'A-Z':
    //       products = products.sort( ( a, b ) => {

    //         if( a.name.toLowerCase() > b.name.toLowerCase() ){
    //           comparacion = 1;
    //         }
    //         else if( a.name.toLowerCase() < b.name.toLowerCase() ){
    //           comparacion = -1;
    //         }

    //         return comparacion;
    //       });
    //       break;
    //     case 'Z-A':
    //       products = products.sort( ( a, b ) => {

    //         if( a.name.toLowerCase() < b.name.toLowerCase() ){
    //           comparacion = 1;
    //         }
    //         else if( a.name.toLowerCase() > b.name.toLowerCase() ){
    //           comparacion = -1;
    //         }
            
    //         return comparacion;
    //       });
    //       break;
    //     case '1-9':
    //       products = products.sort( ( a, b ) => {

    //         if( a.price < b.price ){
    //           comparacion = 1;
    //         }
    //         else if( a.price > b.price ){
    //           comparacion = -1;
    //         }

    //         return comparacion;
    //       });
    //       break;          
    //     case '9-1':
    //       products = products.sort( ( a, b ) => {

    //         if( a.price < b.price ){
    //           comparacion = 1;
    //         }
    //         else if( a.price > b.price ){
    //           comparacion = -1;
    //         }

    //         return comparacion;            
    //       } );
    //       break;
    //     }
    //   }
    // }
    // else if( Object.keys(req.query).length ){

    //   products = productModel.listar( req.query );
    // }
    // else{

    // }
    let palabra_buscada="";
    console.log("req.query");
    console.log(req.query);
    if(req.query.hasOwnProperty("buscar") && req.query.buscar!="" && req.query.buscar!=undefined){
      palabra_buscada=req.query.buscar.toLowerCase();
    }
    let products_completos = productModel.listar();
    if(palabra_buscada)
    products_completos=products_completos.filter(x=>(x.name).toLowerCase().includes(palabra_buscada));
    // if(req.query.hasOwnProperty("precio_minimo")&&!isNaN(Number(req.query.precio_minimo))){
    if(req.query.hasOwnProperty("precio_minimo")&&(/^\d+(\.\d+)?$/.test(req.query.precio_minimo)||/^\d+(\.\d+)?$/.test(req.query.precio_minimo))){
      console.log("minimo si valido");
      products_completos=products_completos.filter(x=>(x.price>=req.query.precio_minimo));
    }
    if(req.query.hasOwnProperty("precio_maximo")&&(/^\d+(\.\d+)?$/.test(req.query.precio_maximo)||/^\d+(\.\d+)?$/.test(req.query.precio_maximo))){
      console.log("MAXIMO si valido");
      products_completos=products_completos.filter(x=>(x.price<=req.query.precio_maximo));
    }
    if(req.query.nuevo=="on")products_completos=products_completos.filter(x=>(x.is_new));
    if(req.query.oferta=="on")products_completos=products_completos.filter(x=>(x.is_ofert));
    if(req.query.especial=="on")products_completos=products_completos.filter(x=>(x.is_limited));
    if(req.query.favorito=="on")products_completos=products_completos.filter(x=>(x.is_favorite));
    if(req.query.hasOwnProperty("ordenar")){
      if(req.query.ordenar=="A-Z"){
        console.log("A-Z");
        products_completos=products_completos.sort((a,b)=>{
          if(a.name.toLowerCase()<b.name.toLowerCase()) return -1;
          if(a.name.toLowerCase()>b.name.toLowerCase()) return 1;
          return 0;
        })
      }
      if(req.query.ordenar=="Z-A"){
        console.log("Z-A");
        products_completos=products_completos.sort((a,b)=>{
          if(a.name.toLowerCase()>b.name.toLowerCase()) return -1;
          if(a.name.toLowerCase()<b.name.toLowerCase()) return 1;
          return 0;
        })
      }
      if(req.query.ordenar=="9-1"){
        console.log("9-1");
        products_completos.sort((a,b)=>{
          if(a.price>b.price)return -1;
          if(a.price<b.price)return 1;
          return 0;
        })
      }
      if(req.query.ordenar=="1-9"){
        console.log("1-9");
        products_completos.sort((a,b)=>{
          if(a.price<b.price)return -1;
          if(a.price>b.price)return 1;
          return 0;
        })
      }
    }
    
    // console.log();
    // console.log("req.query");
    // console.log(req.query);
    // console.log(products);
    // console.log(req.params);
    // if()
    let pagina=1,cantidad_cards=6;
    if(req.params.hasOwnProperty("pag"))pagina=Number(req.params.pag);
    // console.log("max canmtidad :",products.length);
    let maxima_pagina=Math.ceil(products_completos.length/cantidad_cards);
    // console.log(pagina, "_ / _ ", maxima_pagina);
    let cantidad_items=0,minimo,maximo;
    minimo=(pagina-1)*cantidad_cards;
    maximo=(pagina)*cantidad_cards;
    while((cantidad_items<cantidad_cards)&&(minimo<products_completos.length)){
      products.push(products_completos[minimo]);
      minimo++;
      cantidad_items++;
    }
    // console.log(products);
    res.render( "shop/products", {
      iniciado: iniciado,  
      // sesion: "req.session.user",
      head: {

        title: "Shop | Funkoshop",

        styles: [
          // complementos:
          "document/pagination",
          // por página:
          "pages/shop",
          "pages/shop/products"
        ],
        scripts: [
          "sesion/auth"
        ]
      },
      paginacion: {
        btn_anterior: (pagina>1)?true:0,
        // pag_anterior: (pagina>1)?pagina-1:0,
        pagina:pagina,
        // pag_posterior: (pagina<maxima_pagina)?pagina+1:0,
        btn_posterior: (pagina<maxima_pagina)?true:0
      },
      Operador,

      products
    });
  },// fin products

  // detalle del Producto
  product: ( req, res ) => {

    const Product = productModel.ver({ id: req.params.id });  
    // if(req.session.hasOwnProperty("carrito"))
    // console.log(req.session.carrito);
    // else console.log("NO TIENE CARRITO");
    let iniciado=false;
    if(req.session.hasOwnProperty("user"))iniciado=true;
    res.render( "shop/product", {
      iniciado: iniciado,
      head: {

        title: "Items del Carrito | Funkoshop",

        styles: [
          // complementos:
          "document/number",          
          // componentes:
          "components/slider",
          "components/product",
          // por página:
          "pages/shop",
          "pages/shop/product"          
        ],
  
        scripts: [
          // complementos:
          "document/number",
          // componente:
          "components/slider"
        ]
      },
      
      // slider
      products_title: "Productos Relacionados...",
      products_list: productModel.listar([ ['licence','==',Product.licence], ['id','<>',Product.id] ]),

      // formulario
      Product
    });
  },
  productAdder:(req,res)=>{
    console.log(".......................................... post ADDER .................");
    // console.log(req.params);
    // console.log(req.query);
    // console.log(req.body);
    // console.log(cartModel.ver({ user: 1 }).items);
    let id_product=Number(req.params.id),cant_product=Number(req.body.add);
    if(req.session.hasOwnProperty("carrito")){
      console.log("si tenia carrito usuario: "+req.session["carrito"].usuario);
      // console.log("lo que hay en el carrito es:");
      // console.log(req.session["carrito"]);
    }else{
      console.log("no tenia carrito");
      req.session["carrito"] = {
        id: (cantidad_usuarios_sin_registrarse+1),
        usuario: Math.floor(Math.random()*100),
        envio: 0,
        items:[],
        cantidad: 0,
        subtotal: 0,
        total: 0
      };
      cantidad_usuarios_sin_registrarse++;
      console.log("le puse Carrito");
    }
    req.session["carrito"].items.length
    let encontrado=false,i=0;
    while(!encontrado&&i<req.session["carrito"].items.length){
      console.log(".......................................... RECORRO .................");
      if(req.session["carrito"].items[i].id == id_product){
        req.session["carrito"].items[i].cantidad=req.session["carrito"].items[i].cantidad+cant_product;
        // req.session["carrito"].items[i].Product.price;// precio
        req.session["carrito"].cantidad=req.session["carrito"].cantidad+cant_product;
        console.log("precio del producto: ",req.session["carrito"].items[i].Product.price);
        req.session["carrito"].subtotal+=(req.session["carrito"].items[i].Product.price*cant_product);
        req.session["carrito"].total=req.session["carrito"].subtotal+req.session["carrito"].envio;
        encontrado=true;
      }
      i++;
    }
    if(!encontrado){
      console.log("..........................................tuve que poner uno nuevo .......................");
      req.session["carrito"].cantidad=req.session["carrito"].cantidad+cant_product;
      const new_product=productModel.ver({ id: id_product });
      req.session["carrito"].items.push({
        id: id_product,
        product: id_product,
        cantidad: cant_product,
        Product: new_product
      })
      req.session["carrito"].subtotal+=(new_product.price*cant_product);
      req.session["carrito"].total=req.session["carrito"].subtotal+req.session["carrito"].envio;      
    }
    console.log(req.session["carrito"]);
    console.log("---");
    req.session.save();
  },
  // carrito del usuario con Productos seleccionados
  cart: ( req, res ) => {
    // console.log("req.session---------------- CART ------");
    // console.log(req.session.cookie);
    let iniciado=false;
    if(req.session.hasOwnProperty("user"))iniciado=true;
    if(req.session.hasOwnProperty("carrito")){
      console.log("si tenia carrito");
      // console.log("lo que hay en el carrito es:");
      console.log("si tenia carrito usuario: "+req.session["carrito"].usuario);
    }else{
      console.log("no tenia carrito");
      req.session["carrito"] = {
        id: (cantidad_usuarios_sin_registrarse+1),
        usuario: Math.floor(Math.random()*100),
        envio: 0,
        items:[],
        cantidad: 0,
        subtotal: 0,
        total: 0
      };
      cantidad_usuarios_sin_registrarse++;
      console.log("le puse Carrito");
    }
    console.log("ruta carta");
    let carrito=cartModel.ver({ user: 1 });
    if(req.session.hasOwnProperty("carrito")){
      carrito=req.session["carrito"];
      console.log("se encontro:");
      console.log(carrito);
    }else{
      console.log("no tenia carrito tendra lo que siempre tuvieron todos antes");
    }
    // console.log(cartModel.ver({ user: 1 }));
    res.render( "shop/cart", {
      iniciado: iniciado,
      head: {

        title: "Carrito | Funkoshop",

        styles: [
          // complementos:
          "document/table",
          "document/number",          
          // componentes:
          "components/product",
          // por página:
          "pages/shop",
          "pages/shop/cart"
        ],

        scripts: [
          // complementos:
          "document/number",
          // por página
          "pages/shop/cart",
        ]
      },

      Cart: carrito
      
    });
  }
}