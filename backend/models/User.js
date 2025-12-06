const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: String,  // Opcional para usuarios de OAuth
  googleId: String,  // ID único de Google
  avatar: String,    // URL del avatar (puede venir de Google)
  bio: String,       // Biografía del usuario
  website: String,   // Sitio web del usuario
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  purchasedCourses: [{
    courseId: Number,
    title: String,
    description: String,
    category: String,
    instructor: String,
    rating: Number,
    image: String,
    price: Number,
    purchasedAt: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 }
  }]
});

module.exports = mongoose.model('User', userSchema);