'use strict';

/* agrego eventos a los botones */

for( const tipo of [ "add", "remove" ] ){

  for( const button of Array.from( document.querySelectorAll(`div.number .number__button--${tipo}`) ) ){

    button.addEventListener('click',number_change);
  }
}

/* valido lo que ingresa el usuario */

for( const input of Array.from( document.querySelectorAll(`div.number input[type="text"]`) ) ){

  input.addEventListener('input',number_validate);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* controlador numérico */

function number_validate( event ){

  const input = event.target;

  const value = Number(input.value);

  input.value = value || value == 0 ? value : '';
}

function number_change( event ){

  let button = event.target;

  if( button ){

    let numero = button.parentElement.parentElement.querySelector('input');

    if( button.classList.contains('number__button--add') ){

      numero.value = Number(numero.value) + 1;
    }
    else if( button.classList.contains('number__button--remove') ){

      numero.value = Number(numero.value) - 1;
    }

    if( Number(numero.value) < 0 ) numero.value = 0;
  }
  else{

    console.error( '{-_-} Debería haber recibido un evento, pero me enviaron: ', event );
  }
}




