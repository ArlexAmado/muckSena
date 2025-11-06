const express = require('express');
const router = express.Router();
const User = require('../../backend/models/User');  // Cambiado a ruta absoluta desde la raíz del proyecto
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
//for oauth
const passport = require('../../backend/passport');  // Cambiado a ruta absoluta
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';


// Registro de usuario
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'El correo ya está registrado.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.json({ message: 'Usuario registrado correctamente.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Intento de login con:', { email, body: req.body });  // No logueamos la contraseña por seguridad
  try {
    // Buscar todos los usuarios para debug
    const allUsers = await User.find({});
    console.log('Usuarios en la base de datos:', allUsers.map(u => ({ email: u.email, username: u.username })));
    
    const user = await User.findOne({ email });
    console.log('Usuario encontrado:', user ? 'Sí' : 'No');
    if (user) {
      console.log('Detalles del usuario:', {
        email: user.email,
        username: user.username,
        tienePassword: !!user.password,
        tieneGoogleId: !!user.googleId
      });
    }
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado.' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Contraseña incorrecta.' });

    // Generar JWT real para el usuario
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Login exitoso.',
      username: user.username,
      email: user.email,
      token: token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

// Solicitar recuperación de contraseña
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    // Generar token único
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    // Configurar transporter usando variables de entorno si están disponibles
    // En desarrollo, si no hay credenciales, usamos una cuenta de prueba (Ethereal)
    let transporter;
    let usingTestAccount = false;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    } else {
      // Crear cuenta de prueba (Ethereal) para desarrollo
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      usingTestAccount = true;
      console.log('Usando cuenta de prueba de nodemailer:', testAccount);
    }

    // Enlace de recuperación (ajusta la URL a tu frontend). Se puede configurar con FRONTEND_URL en .env
    const frontendUrl = process.env.FRONTEND_URL || 'http://127.0.0.1:5500';
    const resetUrl = `${frontendUrl}/reset-password.html?token=${token}`;

    // Envía el correo
    const info = await transporter.sendMail({
      to: user.email,
      subject: 'Recupera tu contraseña',
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
             <a href="${resetUrl}">${resetUrl}</a>`
    });

    // Si usamos cuenta de prueba, devolver URL de preview para facilitar pruebas
    if (usingTestAccount) {
      const preview = nodemailer.getTestMessageUrl(info);
      console.log('Preview URL (Ethereal):', preview);
      return res.json({ message: 'Correo de recuperación enviado (Ethereal).', previewUrl: preview });
    }

    res.json({ message: 'Correo de recuperación enviado.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

// Restablecer la contraseña
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ message: 'Token inválido o expirado.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Contraseña actualizada correctamente.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

// Ruta 1: Iniciar login con Google
router.get('/auth/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account' // Esto fuerza a mostrar el selector de cuentas
  })
);

// Ruta 2: Callback de Google (donde Google redirige después del login)
router.get('/auth/google/callback',
  passport.authenticate('google', { 
    session: false, 
    failureRedirect: '/login?error=google_auth_failed'
  }),
  (req, res) => {
    // Generar JWT para el usuario
    const token = jwt.sign(
      { 
        userId: req.user._id,
        email: req.user.email 
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );
    
 /*    // URL del frontend (usando Live Server)
    const frontendUrl = 'http://127.0.0.1:5500';
    
    // Redirigir al dashboard con el token (archivo en la raíz)
    res.redirect(`${frontendUrl}/dashboard.html?token=${token}`);
  } */

    // Usa la URL definida en .env o por defecto el 5501
      const frontendUrl = process.env.FRONTEND_URL || 'http://127.0.0.1:5501';
      res.redirect(`${frontendUrl}/home.html?token=${token}`);
  }

  );

module.exports = router;