const mongoose = require('mongoose')

const RegistroSchema = mongoose.Schema({
    enombre : String,
    eapellido : String,
    ecorreo : String,
    eclave : String,
    eusuario : String
  });

  module.exports = {RegistroSchema}