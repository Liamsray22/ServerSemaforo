const mongoose = require('mongoose')

const HistorialSchema = mongoose.Schema({
    lugar : String,
    uso : Number,
    fecha : Date,
    idUsuario : mongoose.Types.ObjectId
  });

  module.exports = {HistorialSchema}