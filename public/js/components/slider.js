
/*   
  
  fuente: 
    https://www.youtube.com/watch?v=BDS57dCSBZ0&list=PLfiFSbj15P0tHOxqs1cICi5dacXrtetTg&t=6s
    https://glidejs.com/docs/setup/
*/

new Glide('.glide',
  {
    type: 'carousel',
    // empience en el primero
    startAt: 0,
    // 3 elementos por slide
    perView: 3, 
    // espaciado de 30px entre ellos
    gap: 30, 
    // puntos de quiebre para el cambio de funcionamiento
    breakpoints: {
      991: {
        perView: 2
      },
      768: {
        perView: 1
      }
    }
  }
).mount();