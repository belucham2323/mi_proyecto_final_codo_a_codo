
const path = require("node:path");

const Multer = require("multer");

const storage = Multer.diskStorage({

  // donde se guarda
  destination: ( req, file, cb ) => cb( null, `public/${path.extname( file.originalname )}` ),

  // nombre del archivo
  filename: ( req, file, cb ) => cb( null, `${file.fieldname}-${Date.now()}-${path.extname( file.originalname )}` )
  
});

module.exports = Multer({ storage });