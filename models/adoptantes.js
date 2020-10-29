const mongoose = require('mongoose');
const Gatito = require('./gatitos');

const adoptantesSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  gatitos: Array,
});


adoptantesSchema.pre('save', async function (next) {
  const gatitosPromises = this.gatitos.map(
    async gatitoId => await Gatito.findById(gatitoId),
  );
  this.gatitos = await Promise.all(gatitosPromises);
  next();
});

const Adoptante = mongoose.model('Adoptante', adoptantesSchema, 'adoptante');

module.exports = Adoptante;
