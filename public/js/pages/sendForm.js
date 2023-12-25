
const form=document.querySelector('.contact-form');
const temp_view=document.getElementById('temp_view');
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const valores=Object.fromEntries(new FormData(e.target))
    
    fetch("/contact",{
        method: "POST",
        // headers:{'Content-Type': 'application/x-www-form-urlencoded'}
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(valores)
    })
    .then(x=>x.json())
    .then(datos=>{
        if(datos.dato)temp_view.innerText="mensaje enviado correctamente";
        else temp_view.innerText="el mensaje no se pudo enviar. intente mas tarde";
        setTimeout(() => {
            temp_view.innerText="";
        }, 4000);
    })
    form.reset();
    // window.location.reload();
});