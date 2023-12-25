
const form = document.querySelector(`form.admin__search`);

if( form ){

  form.addEventListener( 'submit', ( submit ) => {    

    const input = form.querySelector(`input`);

    if( !input.value ){

      submit.preventDefault();

      alert(`Debes completar el valor buscado...`);
    }
  });
}