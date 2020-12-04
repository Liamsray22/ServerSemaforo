const mongoose = require('mongoose')

const HistorialSchema = mongoose.Schema({
    lugar : String,
    uso : Number,
    fecha : String,
    idUsuario : mongoose.Types.ObjectId
  });

  module.exports = {HistorialSchema}