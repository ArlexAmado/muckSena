const express = require('express');
const router = express.Router();
const User = require('../models/User');
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

// Obtener cursos comprados del usuario
router.get('/my-courses', verifyToken, async (req, res) => {
  try {
    console.log('📚 Obteniendo cursos para usuario:', req.userId);
    const user = await User.findById(req.userId);
    if (!user) {
      console.log('❌ Usuario no encontrado');
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    console.log('✅ Usuario encontrado:', user.email);
    console.log('📖 Cursos comprados:', user.purchasedCourses?.length || 0);
    res.json({ courses: user.purchasedCourses || [] });
  } catch (error) {
    console.error('❌ Error al obtener cursos:', error);
    res.status(500).json({ message: 'Error al obtener cursos' });
  }
});

// Agregar curso comprado
router.post('/purchase', verifyToken, async (req, res) => {
  try {
    const { courseId, title, description, category, instructor, rating, image, price } = req.body;
    console.log('🛒 Intentando comprar curso:', title, 'ID:', courseId);
    
    const user = await User.findById(req.userId);
    if (!user) {
      console.log('❌ Usuario no encontrado');
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    console.log('✅ Usuario encontrado:', user.email);
    
    // Verificar si ya tiene el curso
    const alreadyPurchased = user.purchasedCourses.some(c => c.courseId === courseId);
    if (alreadyPurchased) {
      console.log('⚠️ Curso ya comprado');
      return res.status(400).json({ message: 'Ya tienes este curso' });
    }
    
    // Agregar curso
    user.purchasedCourses.push({
      courseId,
      title,
      description,
      category,
      instructor,
      rating,
      image,
      price,
      purchasedAt: new Date(),
      progress: 0
    });
    
    await user.save();
    console.log('✅ Curso agregado exitosamente. Total cursos:', user.purchasedCourses.length);
    
    res.json({ 
      message: 'Curso agregado exitosamente',
      course: user.purchasedCourses[user.purchasedCourses.length - 1]
    });
  } catch (error) {
    console.error('❌ Error al comprar curso:', error);
    res.status(500).json({ message: 'Error al comprar curso' });
  }
});

// Actualizar progreso de un curso
router.put('/progress/:courseId', verifyToken, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { progress } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    const course = user.purchasedCourses.find(c => c.courseId == courseId);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    
    course.progress = progress;
    await user.save();
    
    res.json({ message: 'Progreso actualizado', progress });
  } catch (error) {
    console.error('Error al actualizar progreso:', error);
    res.status(500).json({ message: 'Error al actualizar progreso' });
  }
});

module.exports = router;
