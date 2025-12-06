require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });

// ========== IMPORTACIONES ==========
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const path = require('path');
const session = require('express-session');
const passport = require('./backend/passport');
const User = require('./backend/models/User');

// ========== INICIALIZACIÓN EXPRESS ==========
const app = express();

// ========== MIDDLEWARES BÁSICOS ==========
// Aumentar límite de tamaño para imágenes en base64
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Configuración de CORS
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5500', 'http://127.0.0.1:5500', 'http://127.0.0.1:5501', 'http://localhost:5501', 'https://mucksena-web.onrender.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware adicional para CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Manejar las solicitudes OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

// Middleware para headers de seguridad
app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', '');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// ========== CONFIGURACIÓN SESSION & PASSPORT ==========
app.use(session({
    secret: process.env.SESSION_SECRET || 'dev_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Serialización de usuario
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// ========== CONEXIÓN MONGODB ==========
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://arlexamao:TlRYOMBVn5ZxirTP@mucksena.0finedf.mongodb.net/muckSena';
mongoose.connect(mongoUri)
    .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
    .catch(err => console.error('Error al conectar a MongoDB Atlas:', err));

// ========== CONFIGURACIÓN JWT ==========
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

// ========== MIDDLEWARE DE AUTENTICACIÓN ==========
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

// ========== RUTAS DE AUTENTICACIÓN ==========
const authRoutes = require('./backend/routes/auth');
app.use('/api', authRoutes);

// ========== RUTAS DE CURSOS ==========
const coursesRoutes = require('./backend/routes/courses');
app.use('/api/courses', coursesRoutes);

// ========== RUTAS DE PERFIL ==========
const profileRoutes = require('./backend/routes/profile');
app.use('/api/profile', profileRoutes);

// ========== RUTAS DE LA API ==========
// ========== HEALTH CHECK ==========
app.get('/api/health', (req, res) => {
    const mongoState = mongoose.connection.readyState;
    const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
    res.json({
        status: 'ok',
        mongo_status: states[mongoState] || 'unknown',
        env: process.env.NODE_ENV,
        message: 'MuckSena API is running'
    });
});

app.get('/', (req, res) => {
    res.json({ message: 'MuckSena API Service. Use endpoints at /api' });
});

// ========== INICIAR SERVIDOR ==========
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend en http://localhost:${PORT}`);
});
