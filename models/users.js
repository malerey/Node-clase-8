const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usersSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, 'Falta el nombre']
  },
  email: {
    type: String,
    required: [true, 'Falta email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String, 
    required: [true, 'password'],
    select: false
  },
  role: {
    type: String, 
    select: false,
  }
});

// bcryptjs

// pre-save middleware 
usersSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12)
  next();
});


const User = mongoose.model('User', usersSchema, 'users');

module.exports = User;
