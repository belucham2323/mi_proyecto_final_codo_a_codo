const fs=require('fs');
const path=require('path');
const carritos=JSON.parse(fs.readFileSync(path.join("../data/carritos.json"), 'utf8'));
module.exports={
    getCarritos:carritos,
    saveCarritos:(carritos)=>{
        fs.writeFileSync(path.join("../data/carritos.json"),JSON.stringify(carritos), 'utf8');
    }
}