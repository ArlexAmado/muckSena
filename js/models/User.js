const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date

  // NUEVOS CAMPOS para OAuth:
  googleId:{
    type: String,
    unique: true,
    sparse: true  // permite null, pero único si existe
  },
    avatar: {
      type: String,
      default: null
    }
  
});



module.exports = mongoose.model('User', userSchema);  