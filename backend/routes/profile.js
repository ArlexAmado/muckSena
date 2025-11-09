const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

// Middleware para verificar token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

// Actualizar perfil
router.put('/update', verifyToken, async (req, res) => {
  try {
    const { username, bio, website } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    if (username) user.username = username;
    if (bio !== undefined) user.bio = bio;
    if (website !== undefined) user.website = website;
    
    await user.save();
    
    res.json({ 
      message: 'Perfil actualizado exitosamente',
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        website: user.website
      }
    });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ message: 'Error al actualizar perfil' });
  }
});

// Cambiar contraseña
router.put('/change-password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    // Verificar si el usuario tiene contraseña (puede ser usuario de OAuth)
    if (!user.password) {
      return res.status(400).json({ message: 'No puedes cambiar la contraseña de una cuenta OAuth' });
    }
    
    // Verificar contraseña actual
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return res.status(400).json({ message: 'Contraseña actual incorrecta' });
    }
    
    // Actualizar contraseña
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    
    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ message: 'Error al cambiar contraseña' });
  }
});

// Obtener perfil
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.json({ user });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
});

// Actualizar avatar
router.put('/avatar', verifyToken, async (req, res) => {
  try {
    const { avatar } = req.body;
    
    if (!avatar) {
      return res.status(400).json({ message: 'Avatar no proporcionado' });
    }
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    user.avatar = avatar;
    await user.save();
    
    res.json({ 
      message: 'Avatar actualizado exitosamente',
      avatar: user.avatar
    });
  } catch (error) {
    console.error('Error al actualizar avatar:', error);
    res.status(500).json({ message: 'Error al actualizar avatar' });
  }
});

module.exports = router;
