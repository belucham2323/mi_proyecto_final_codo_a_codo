'use strict';

// actualizar subtotales

/* agrego eventos a los botones */

[ "add", "remove" ].forEach( tipo => 
  
  Array.from( document.querySelectorAll(`.number__button--${tipo}`) ).forEach( button => 
    
    button.addEventListener('click',shop_cart_refresh) 
  ) 

);

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

function shop_cart_refresh( event ){
  
  let button = event.target;

  if( button ){

    let variacion = 0;    

    if( button.classList.contains('number__button--add') ){

      variacion = +1;
    }
    else if( button.classList.contains('number__button--remove') ){

      variacion = -1;
    }
    
    // actualizo ficha

    const tr = button.parentElement.parentElement.parentElement.parentElement.parentElement;

    const precio = Number(tr.querySelector('.product__price').innerText.split('$')[1]);    
    
    tr.querySelector('.product__total').innerText = precio * button.parentElement.previousElementSibling.value;    

    // actualizo resumen

    const Resumen = tr.parentElement.parentElement.parentElement.nextElementSibling;

    const cantidad_total = Resumen.querySelector('.summary__cantidad');

    const sub_total = Resumen.querySelector('.summary__subtotal');

    const envio = Resumen.querySelector('.summary__envio');

    const costo_total = Resumen.querySelector('.summary__total');

    cantidad_total.innerText = 0;

    for( const cantidad of tr.parentElement.querySelectorAll('input[name="cantidad"]') ){

      cantidad_total.innerText = ( Number(cantidad_total.innerText) + Number(cantidad.value) );

    }    

    sub_total.innerText = 0;

    for( const item_total of tr.parentElement.querySelectorAll('p.product__total') ){

      sub_total.innerText = ( Number(sub_total.innerText) + Number(item_total.innerText) ).toFixed(2);

    }

    costo_total.innerText = ( Number(sub_total.innerText) + Number(envio.innerText) ).toFixed(2);


  }
  else{

    console.error( '{-_-} Debería haber recibido un evento, pero me enviaron: ', event );
  }

}