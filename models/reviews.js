const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  puntaje: {
    type: Number,
    required: true,
  },
  refugio: {
      type: mongoose.Schema.ObjectId,
      ref: 'Refugio',
    }
});


const Review = mongoose.model('Review', reviewsSchema, 'review');

module.exports = Review;
