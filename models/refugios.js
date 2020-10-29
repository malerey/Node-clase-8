const mongoose = require('mongoose');

const refugiosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  gatitos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Gatito',
    },
  ],
}, 
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

refugiosSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'refugio', 
  localField: '_id'
})



const Refugio = mongoose.model('Refugio', refugiosSchema, 'refugio');

module.exports = Refugio;
