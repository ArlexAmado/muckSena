const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: String,  // Opcional para usuarios de OAuth
  googleId: String,  // ID único de Google
  avatar: String,    // URL del avatar (puede venir de Google)
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = mongoose.model('User', userSchema);