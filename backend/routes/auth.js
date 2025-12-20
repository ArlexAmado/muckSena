const express = require('express');
const router = express.Router();
const User = require('../../backend/models/User');  // Cambiado a ruta absoluta desde la raíz del proyecto
const crypto = require('crypto');
const { Resend } = require('resend');
const bcrypt = require('bcrypt');
//for oauth
const passport = require('../../backend/passport');  // Cambiado a ruta absoluta
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

import(resend) from 'resend';


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

    // Validar que la API key de Resend esté configurada
    if (!process.env.RESEND_API_KEY) {
      console.error('ERROR: RESEND_API_KEY no está configurado en las variables de entorno');
      return res.status(500).json({
        message: 'Error de configuración del servidor. Contacta al administrador.',
        error: 'Resend API key not configured'
      });
    }

    // Inicializar cliente de Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Enlace de recuperación
    const frontendUrl = process.env.FRONTEND_URL || 'http://127.0.0.1:5501/public';
    const resetUrl = `${frontendUrl}/reset-password.html?token=${token}`;

    // Email desde donde se enviará (usa el configurado o el de prueba de Resend)
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    // Enviar el correo usando Resend
    const { data, error } = await resend.emails.send({
      from: `MuckSena <${fromEmail}>`,
      to: user.email,
      subject: 'Recupera tu contraseña - MuckSena',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Recuperación de Contraseña</h2>
          <p>Hola,</p>
          <p>Recibimos una solicitud para restablecer tu contraseña en MuckSena.</p>
          <p>Haz clic en el siguiente botón para crear una nueva contraseña:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #4CAF50; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; display: inline-block;">
              Restablecer Contraseña
            </a>
          </div>
          <p>O copia y pega este enlace en tu navegador:</p>
          <p style="color: #666; word-break: break-all;">${resetUrl}</p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">
            Este enlace expirará en 1 hora. Si no solicitaste este cambio, ignora este correo.
          </p>
        </div>
      `
    });

    if (error) {
      console.error('Error al enviar email con Resend:', error);
      return res.status(500).json({
        message: 'Error al enviar el correo de recuperación.',
        error: process.env.NODE_ENV === 'production' ? undefined : error.message
      });
    }

    console.log(`Correo de recuperación enviado a: ${user.email} (ID: ${data.id})`);
    res.json({ message: 'Correo de recuperación enviado. Revisa tu bandeja de entrada.' });

  } catch (err) {
    console.error('Error en forgot-password:', err);
    res.status(500).json({
      message: 'Error al enviar el correo de recuperación.',
      error: process.env.NODE_ENV === 'production' ? undefined : err.message
    });
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