
'use strict';

class form_error {

  name = "";
  
  msg = "";

  constructor( name, msg ){

    this.name = name;

    this.msg = msg;

  }
}
const msg=document.getElementById( "msg" );
const form = document.querySelector(`.form`);
var ln=document.body.parentElement.lang;
// window.onload = () => {
  // ln=window.navigator.language || navigator.browserLanguage || document.body.parentElement.lang;
  // console.log(document.body.parentElement.lang);
  // }
console.log(ln);
if( form ){

  form.addEventListener( 'submit', ( submit ) => {    
    const valores=Object.fromEntries(new FormData(submit.target))
    const idioma={name:"nombre",lastName:"apellido",email:"mail",password:"contraseña",password_repit:"repeticion de contraseña"};
    // ejecutar validaciones
    const errors = [];

    // Obligatorios: Nombre, Apellido, Email, Contraseña y Repetir Constraseña...
    for (const key in valores) {
      if (Object.hasOwnProperty.call(valores, key)) {
        const element = valores[key];
        if(!element){
          if(ln.includes("es"))
          errors.push( new form_error( "accept", `el campo ${idioma[key]} no puede estar vacio` ))
          else
          errors.push( new form_error( "accept", `el campo ${key} cannot be empty` ))
        }
      }
    }
    // Formato del Nombre y Apellido: Palabra Unica sin Números
    if(/\d+/.test(valores.name))
    errors.push( new form_error( "accept", "el Nombre no debe contener numeros" ));
    if(/\d+/.test(valores.lastName))
    errors.push( new form_error( "accept", "el Apellido no debe contener numeros" ));
    // Formato del Email
    const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    // Using test we can check if the text match the pattern
    if( !validEmail.test(valores.email) )
    errors.push( new form_error( "accept", "Mail Debe contener (caracteres @ caracteres [.] )" ));
    // Formato de la Contraseña
    const passIdeal = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){4,15}$/;
    if( !passIdeal.test(valores.password) )
    errors.push( new form_error( "accept", "contraseña: minimo 8 caracteres, 1 Mayuscula, 1 minuscula, 1 digito, 1 especial" ));
    // Contraseña debe Coincidir con Repetir Contraseña
    if(!!valores.password&&!!valores.password_repit&&valores.password!=valores.password_repit)
    errors.push( new form_error( "accept", "los campos: contraseña y repite contraseña deben ser iguales" ));
    /* -- modo agregar -- */

      submit.preventDefault();
      // - términos y condiciones
    const accept = form.querySelector(`#user-accept`);
    // console.log("accept.checked: ",accept.checked);
    if( accept && !accept.checked ){

      errors.push( new form_error( "accept", "Debes aceptar los términos y Condiciones para poder Registrarte..." ))
    }

    /* -- proceso errores -- */

    if( errors.length ){

      submit.preventDefault();

      // mostrar mensajes
      let text = [];

      for( const error of errors ){

        text.push(`-> ${error.msg}`);
      }      

      alert( text.join("\n") );      
    }
    else{
      fetch("/user/register",{
        method: "POST",
        // method: form.method,
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(valores)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        msg.innerText=data.msg;
      });
    }
  });
}