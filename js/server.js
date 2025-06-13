const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB Atlas
const mongoUri = 'mongodb+srv://arlexamao:1234@cluster0.aghgcmf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

// Esquema de usuario
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});
const User = mongoose.model('User', userSchema);

// JWT
const JWT_SECRET = 'tu_clave_secreta'; // Usa variable de entorno en producción

// Middleware para proteger rutas
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No autorizado' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

// Registro de usuario
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validar correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Correo electrónico inválido' });
  }

  // Validar contraseña fuerte
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres, incluyendo una letra y un número' });
  }

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'El usuario ya existe' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.json({ message: 'Usuario registrado exitosamente' });
});

// Login de usuario
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Credenciales inválidas' });

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });

  res.json({ username: user.username, email: user.email, token });
});

// Ruta protegida: perfil de usuario
app.get('/api/perfil', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json({ username: user.username, email: user.email });
});

// Cambiar contraseña (requiere login)
app.post('/api/cambiar-password', authMiddleware, async (req, res) => {
  const { newPassword } = req.body;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres, una letra y un número.' });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(req.user.userId, { password: hashedPassword });
  res.json({ message: 'Contraseña actualizada correctamente.' });
});

// Solicitar recuperación de contraseña
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    // Generar token único
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    // Configura tu transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'arlex.amao@gmail.com', // Cambia esto por tu correo real
        pass: 'magoydgjugruztox'  // Cambia esto por tu contraseña de app
      }
    });

    // Enlace de recuperación (ajusta la URL a tu frontend)
    const resetUrl = `http://localhost:3000/reset-password.html?token=${token}`;

    // Envía el correo
    await transporter.sendMail({
      to: user.email,
      subject: 'Recupera tu contraseña',
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
             <a href="${resetUrl}">${resetUrl}</a>`
    });

    res.json({ message: 'Correo de recuperación enviado.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});

// Restablecer la contraseña
app.post('/api/reset-password', async (req, res) => {
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

app.listen(3000, () => console.log('Servidor backend en http://localhost:3000'));