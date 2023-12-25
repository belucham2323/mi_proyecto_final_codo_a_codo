const fs = require('fs');
const path = require('path');
let listaMensajes=getMensajes();
function saveMensajes(){
    try {
        fs.writeFileSync(path.join(__dirname, "../data/mensajes.json"),JSON.stringify(listaMensajes),'utf-8');
        return true;
    } catch (error) {
        console.log("error al guardar mensajes: " + error);
        return false;
    }
}
function getMensajes(){
    return JSON.parse(fs.readFileSync(path.join(__dirname, "../data/mensajes.json"),"utf8"));
}
module.exports={
    listaMensajes:listaMensajes,
    getMensajes:getMensajes,
    saveMensajes:saveMensajes
}