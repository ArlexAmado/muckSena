# 🎓 MuckSena - Plataforma de Gestión de Cursos

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Google OAuth](https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)

**Sistema de autenticación completo con OAuth 2.0 y gestión de cursos en línea**

[Demo](#-demo) • [Características](#-características) • [Instalación](#-instalación) • [Documentación](#-documentación)

</div>

---

## 📋 Descripción

MuckSena es una plataforma moderna de gestión de cursos en línea desarrollada como proyecto formativo. Implementa un sistema de autenticación robusto que incluye registro tradicional, OAuth 2.0 con Google, recuperación de contraseña y gestión de perfiles de usuario.

El proyecto está construido con tecnologías modernas y sigue las mejores prácticas de seguridad y desarrollo web.

---

## ✨ Características

### 🔐 Autenticación Completa

- **Registro de usuarios** con validación de email y contraseña
- **Login tradicional** con email y contraseña
- **OAuth 2.0 con Google** para inicio de sesión rápido
- **Recuperación de contraseña** vía email con tokens seguros
- **JWT (JSON Web Tokens)** para sesiones seguras
- **Contraseñas hasheadas** con bcrypt

### 👤 Gestión de Usuarios

- Perfiles de usuario personalizados
- Avatar automático con iniciales
- Integración con foto de perfil de Google
- Sesiones persistentes con localStorage

### 🎨 Interfaz Moderna

- Diseño oscuro profesional con tema verde (#98ca3f)
- Modales animados con efectos glassmorphism
- Responsive design para móviles y tablets
- Navegación fluida entre páginas
- Dropdowns interactivos mejorados

### 📧 Sistema de Correos

- Envío de emails de recuperación
- Soporte para Gmail y otros servicios SMTP
- Modo de prueba con Ethereal Email

### 🔒 Seguridad

- Tokens JWT con expiración (2 horas)
- Tokens de recuperación con expiración (1 hora)
- Validación de datos en frontend y backend
- CORS configurado correctamente
- Variables de entorno para datos sensibles

---

## 🛠️ Tecnologías

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB Atlas** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Passport.js** - Autenticación OAuth
- **JWT** - Tokens de sesión
- **Bcrypt** - Hash de contraseñas
- **Nodemailer** - Envío de emails

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos modernos
- **JavaScript (ES6+)** - Lógica del cliente
- **Fetch API** - Peticiones HTTP

---

## 📁 Estructura del Proyecto

```
muckSena/
├── backend/
│   ├── models/
│   │   └── User.js              # Modelo de usuario
│   ├── routes/
│   │   └── auth.js              # Rutas de autenticación
│   └── passport.js              # Configuración OAuth
├── frontend/
│   └── js/
│       ├── auth.js              # Lógica de autenticación
│       └── dashboard.js         # Lógica del dashboard
├── js/
│   ├── server.js                # Servidor Express
│   ├── home.js                  # Lógica de home
│   └── curso.js                 # Lógica de cursos
├── css/
│   ├── dashboard.css            # Estilos del dashboard
│   └── home.css                 # Estilos de home
├── images/
│   └── login/                   # Imágenes de login
├── dashboard.html               # Página de login/landing
├── home.html                    # Dashboard principal
├── reset-password.html          # Recuperación de contraseña
├── .env                         # Variables de entorno
├── package.json                 # Dependencias
└── README.md                    # Este archivo
```

---

## 🚀 Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- MongoDB Atlas (cuenta gratuita)
- Cuenta de Google Cloud (para OAuth)
- Git

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/ArlexAmado/muckSena.git
cd muckSena
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Servidor
NODE_ENV=development
PORT=3000

# Base de datos
MONGO_URI=tu_conexion_mongodb_atlas

# JWT
JWT_SECRET=tu_clave_secreta_jwt
SESSION_SECRET=tu_clave_secreta_session

# Google OAuth
GOOGLE_CLIENT_ID=tu_client_id_de_google
GOOGLE_CLIENT_SECRET=tu_client_secret_de_google
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# Email (opcional)
EMAIL_SERVICE=gmail
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password

# Frontend
FRONTEND_URL=http://127.0.0.1:5501
```

### Paso 4: Configurar Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita la API de Google+
4. Crea credenciales OAuth 2.0
5. Agrega las URIs de redirección:
   - `http://localhost:3000/api/auth/google/callback`
6. Copia el Client ID y Client Secret al `.env`

### Paso 5: Iniciar el servidor

```bash
node js/server.js
```

El servidor estará corriendo en `http://localhost:3000`

### Paso 6: Abrir el frontend

Usa Live Server o cualquier servidor local para abrir `dashboard.html`

---

## 📖 Uso

### Registro de Usuario

1. Abre `dashboard.html`
2. Haz clic en "Regístrate"
3. Completa el formulario
4. Haz clic en "Crear cuenta"

### Login Tradicional

1. Ingresa tu email y contraseña
2. Haz clic en "Iniciar sesión"
3. Serás redirigido a `home.html`

### Login con Google

1. Haz clic en el botón de Google
2. Selecciona tu cuenta de Google
3. Autoriza la aplicación
4. Serás redirigido automáticamente

### Recuperar Contraseña

1. Haz clic en "¿Olvidaste tu contraseña?"
2. Ingresa tu email
3. Revisa tu correo (o la consola si usas Ethereal)
4. Haz clic en el enlace del email
5. Ingresa tu nueva contraseña

---

## 🧪 Pruebas con Insomnia

El proyecto incluye una colección completa de Insomnia para probar todos los endpoints.

### Importar la colección

1. Abre Insomnia
2. Ve a Application → Import/Export → Import Data
3. Selecciona el archivo `insomnia-collection-completo.json`
4. ¡Listo para probar!

### Endpoints disponibles

#### Autenticación Tradicional
- `POST /api/register` - Registrar usuario
- `POST /api/login` - Iniciar sesión
- `GET /api/perfil` - Obtener perfil (requiere token)

#### OAuth con Google
- `GET /api/auth/google` - Iniciar OAuth (navegador)
- `GET /api/auth/google/callback` - Callback automático

#### Recuperación de Contraseña
- `POST /api/forgot-password` - Solicitar recuperación
- `POST /api/reset-password` - Restablecer contraseña

Ver documentación completa en `PRUEBAS_INSOMNIA.md`

---

## 📚 Documentación Adicional

- **[DOCUMENTACION_OAUTH.md](DOCUMENTACION_OAUTH.md)** - Explicación detallada de OAuth 2.0
- **[PRUEBAS_INSOMNIA.md](PRUEBAS_INSOMNIA.md)** - Guía completa de pruebas
- **[CAMBIOS_REDIRECCION_HOME.md](CAMBIOS_REDIRECCION_HOME.md)** - Cambios en el flujo de redirección
- **[FLUJO_OAUTH_PASO_A_PASO.md](FLUJO_OAUTH_PASO_A_PASO.md)** - Flujo detallado de OAuth

---

## 🔒 Seguridad

### Buenas prácticas implementadas

- ✅ Contraseñas hasheadas con bcrypt (10 rounds)
- ✅ JWT con expiración de 2 horas
- ✅ Tokens de recuperación con expiración de 1 hora
- ✅ Validación de datos en frontend y backend
- ✅ CORS configurado correctamente
- ✅ Variables de entorno para datos sensibles
- ✅ Sanitización de inputs
- ✅ HTTPS recomendado en producción

### Recomendaciones para producción

- Usar HTTPS en todas las conexiones
- Configurar variables de entorno en el servidor
- Implementar rate limiting
- Agregar logs de seguridad
- Usar helmet.js para headers de seguridad
- Implementar CSRF protection

---

## 🎨 Capturas de Pantalla

### Dashboard / Login
![Dashboard](https://via.placeholder.com/800x400/1a1f2e/98ca3f?text=Dashboard+Login)

### Home / Cursos
![Home](https://via.placeholder.com/800x400/0f1419/98ca3f?text=Home+Cursos)

### Modal de Login
![Modal](https://via.placeholder.com/800x400/ffffff/98ca3f?text=Modal+Login)

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 👨‍💻 Autor

**Arlex Amado**

- GitHub: [@ArlexAmado](https://github.com/ArlexAmado)
- Email: arlex.amao@gmail.com

---

## 🙏 Agradecimientos

- SENA - Por el apoyo en el desarrollo del proyecto formativo
- Google - Por la API de OAuth 2.0
- MongoDB - Por la base de datos Atlas gratuita
- Comunidad de desarrolladores - Por las librerías open source

---

## 📊 Estado del Proyecto

🟢 **Activo** - En desarrollo continuo

### Próximas características

- [ ] Sistema de roles (admin, instructor, estudiante)
- [ ] Gestión completa de cursos
- [ ] Sistema de calificaciones
- [ ] Chat en tiempo real
- [ ] Notificaciones push
- [ ] Dashboard de analytics
- [ ] Modo oscuro/claro
- [ ] Internacionalización (i18n)

---

## 🐛 Reporte de Bugs

Si encuentras un bug, por favor abre un [issue](https://github.com/ArlexAmado/muckSena/issues) con:

- Descripción del problema
- Pasos para reproducirlo
- Comportamiento esperado
- Capturas de pantalla (si aplica)
- Información del entorno (OS, navegador, versión de Node)

---

## 📞 Soporte

Si necesitas ayuda:

1. Revisa la [documentación](#-documentación-adicional)
2. Busca en los [issues existentes](https://github.com/ArlexAmado/muckSena/issues)
3. Abre un nuevo issue si no encuentras solución

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐**

Hecho con ❤️ por [Arlex Amado](https://github.com/ArlexAmado)

</div>
