# 🚀 NODEJS - FUNKOSHOP

Este proyecto de una "Tienda en Línea" representa el challenge integrador de NodeJS en el Programa Codo a Codo 4.0.

## HOME

En primer lugar se muestra un Banner con un botón para ver todos los nuevos productos en el shop. Esto se logra con un enlace que contenga el filtro con dicho fin ( campo is_new de products ).

Luego muestra un listado con las primeras tres colecciones que agrupan los productos por su licencia. Al hacer click en el botón "ver colección" la página se redirecciona al shop filtrando el listado según la licencia de la colección seleccionada. 

Por último, se muestra un slider con los últimos lanzamientos, estos son aquellos productos con el flag is_new en true. 

### Componentes

Todos los productos que tengan este flag activado, aparecen con una etiqueta de "nuevo" en la esquina superior derecha de la imagen dentro de su card correspondiente. 

## SHOP

Al ingresar se muestran todos los productos de la base, con acceso a filtros en un panel lateral. La lógica de los filtros se encuentra en el controlador correspondiente al shop ( products ). En el operador lateral, se permite filtrar por item o categoría, además se puede fijar un rango de precios ( mínimo y máximo ) y aplicar algunos flags ( si es nuevo, está de oferta, es una edicion especial o es un producto considerado favorito -se vende mucho- ). Todos estos datos estarán en cada objeto de la base/json como un atributo booleano. 

Si se hace clcik en un producto de la lista, se redirije a otra página que muestra un detalle del producto ( /shop/product ). En esta página se muestra un controlador de cantidades y un botón para agregar al carrito.

Al presionar el botón "agregar al carrito" se debe agregar al json del carrito un nuevo item si el producto no existe, o bien acutalizar la cantidad existente ( -pendiente ).

En la página del Carrito ( shop/cart ), a la que se puede acceder desde el navbar, se muestra el listado de productos seleccionados y un Resumen de la Compra con los totales. Desde la lista se puede cambiar la cantidad y al hacerlo, se actualizan las cantidades y totales del producto y del Resumen.

Al presionar el botón de "Ir a Pagar" y confirmar se vaciarán los items del carrito ( -pendiente ).

## USER

El Login de Usuario valida que el email exista y el password coincida con el almacenado en la tabla. El password se hashea antes de almacenarse o compararse, quedando en todo momento ecnriptado.

Al confirmar la operación de Loggin, se actualizará la Sesion del Servidor. Esto permitirá el acceso a las Páginas del Administrador de Productos ( CRUD ).

El formulario de Registro pide Nombre y Apellido, Email y Contraseña. También se requiere repetir el password y aceptar los términos y condiciones del Servicio brindado. Al confirmar la operación de Registro, se actualizarán los datos del json/base. ( -pendiente )

## PRODUCT

Desde esta ruta se puede acceder al CRUD de productos. 

En la pantalla principal ( product/admin ) se muestra un listado de los productos con la posibilidad de filtrar por id, código sku, categoría ( figura, remera, llavero ) o licencia ( pokemon, naruto, harry potter, etc ). 

En la sección lateral izquierda del titulo se muestra un botón con el signo "+" para agregar un nuevo producto. Al hacer click se redirecciona el navegador al formulario con dicho fin ( product/create ).

Desde la lista también se puede editar o eliminar el producto ( product/:id ). Al hacer click en el boton del lapiz, se redirije el navegador al formulario con los datos del producto.

Al confirmar las operaciones de Alta o Modifiación, se actualizarán los datos del json/base.# Proyec_codo
