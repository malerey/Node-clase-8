const mongoose = require('mongoose');

const gatitosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  edad: Number,
  disponible: {
    type: Boolean,
    default: false,
  },
});

const Gatito = mongoose.model('Gatito', gatitosSchema, 'gatitos');

module.exports = Gatito;
