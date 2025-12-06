# PLAN DE VALIDACIÓN DE CARACTERÍSTICAS MÍNIMAS DE HARDWARE

## PORTADA

**Programa de Formación:** Análisis y Desarrollo de Software  
**Proyecto Formativo:** Construcción de software integrador de tecnologías orientadas a servicios  
**Fase del Proyecto:** Ejecución  
**Resultado de Aprendizaje:** 220501097-01  
**Actividad de Aprendizaje:** GA10-220501097-AA2  
**Evidencia:** GA10-220501097-AA2-EV01  

**Proyecto:** MuckSena - Plataforma de Gestión de Cursos  
**Autor:** Arlex Amado  
**Fecha:** Noviembre 2025  

---

## INTRODUCCIÓN

El presente documento establece el plan de validación de características mínimas de hardware necesarias para el despliegue exitoso de la aplicación web **MuckSena**, una plataforma de gestión de cursos en línea desarrollada con tecnologías modernas.

MuckSena es una aplicación web construida con las siguientes características técnicas:

- **Backend:** Node.js con Express.js
- **Base de datos:** MongoDB Atlas (servicio en la nube)
- **Autenticación:** JWT y OAuth 2.0 con Google
- **Usuarios proyectados:** 250 usuarios activos no concurrentes
- **Tipo de aplicación:** Web application con arquitectura cliente-servidor

Este plan de validación tiene como objetivo verificar que el entorno de despliegue cumple con los requisitos mínimos de hardware, sistema operativo, licenciamiento y configuración de base de datos para garantizar el funcionamiento óptimo de la aplicación.

---

## JUSTIFICACIÓN DE LOS ÍTEMS SELECCIONADOS

La selección de los elementos incluidos en este plan de validación se fundamenta en los siguientes criterios:

### 1. **Requisitos del Sistema Operativo**
Es fundamental verificar la compatibilidad del sistema operativo con Node.js y las dependencias del proyecto. Node.js tiene requisitos específicos según la versión y el sistema operativo, lo que impacta directamente en la capacidad de ejecutar la aplicación.

### 2. **Especificaciones de Hardware**
Con una proyección de 250 usuarios activos no concurrentes, es necesario dimensionar correctamente los recursos de CPU, RAM y almacenamiento para evitar cuellos de botella en el rendimiento. Estos valores se basan en las recomendaciones oficiales de Node.js y MongoDB para aplicaciones de producción.

### 3. **Licenciamiento de Software**
La verificación del tipo de licencia es crucial para garantizar el cumplimiento legal y la sostenibilidad del proyecto. Se debe validar que todas las tecnologías utilizadas sean compatibles con el uso previsto (educativo/comercial).

### 4. **Requisitos de Base de Datos**
MongoDB Atlas es un servicio en la nube que requiere conectividad de red estable y configuraciones específicas. Es necesario verificar que el servidor tenga acceso a internet y cumpla con los requisitos de seguridad para la conexión con servicios externos.

### 5. **Requisitos de Red y Seguridad**
Para una aplicación web con autenticación OAuth 2.0 y servicios externos (Google OAuth, MongoDB Atlas, Nodemailer), es esencial validar la conectividad, puertos abiertos y certificados SSL/TLS.

---

## 1. VERIFICACIÓN DEL SISTEMA OPERATIVO

### 1.1 Sistemas Operativos Compatibles

La aplicación MuckSena puede ejecutarse en los siguientes sistemas operativos:

| Sistema Operativo | Versión Mínima | Versión Recomendada | Arquitectura |
|-------------------|----------------|---------------------|--------------|
| **Windows** | Windows 10 | Windows 11 / Windows Server 2019+ | x64 |
| **Linux** | Ubuntu 18.04 LTS | Ubuntu 22.04 LTS / Debian 11+ | x64 |
| **macOS** | macOS 10.15 (Catalina) | macOS 13 (Ventura) o superior | x64 / ARM64 |

### 1.2 Requisitos del Sistema Operativo

#### **Windows**
- Windows 10 (64-bit) o superior
- Windows Server 2016 o superior para entornos de producción
- Actualizaciones de seguridad al día
- PowerShell 5.1 o superior
- Soporte para TLS 1.2 o superior

#### **Linux (Recomendado para producción)**
- Distribución: Ubuntu Server 20.04 LTS o superior, CentOS 8+, Debian 11+
- Kernel: 4.15 o superior
- Systemd para gestión de servicios
- OpenSSL 1.1.1 o superior
- Soporte para IPv4 e IPv6

#### **macOS**
- macOS 10.15 (Catalina) o superior
- Xcode Command Line Tools instalado
- Homebrew (recomendado para gestión de paquetes)

### 1.3 Software Base Requerido

| Software | Versión Mínima | Versión Recomendada | Propósito |
|----------|----------------|---------------------|-----------|
| **Node.js** | v14.x | v18.x LTS o v20.x LTS | Runtime de JavaScript |
| **npm** | v6.x | v9.x o superior | Gestor de paquetes |
| **Git** | v2.20 | v2.40 o superior | Control de versiones |

### 1.4 Verificación del Sistema Operativo

**Comandos de verificación:**

**Windows:**
```cmd
systeminfo | findstr /B /C:"OS Name" /C:"OS Version"
wmic os get osarchitecture
```

**Linux:**
```bash
lsb_release -a
uname -r
uname -m
```

**macOS:**
```bash
sw_vers
uname -m
```

### 1.5 Verificación de Node.js

```bash
node --version
npm --version
```

**Resultado esperado:**
- Node.js: v14.0.0 o superior (recomendado v18.x o v20.x LTS)
- npm: v6.0.0 o superior

---

## 2. CARACTERÍSTICAS MÍNIMAS DE HARDWARE

### 2.1 Especificaciones para Servidor de Desarrollo

| Componente | Mínimo | Recomendado |
|------------|--------|-------------|
| **CPU** | 2 núcleos @ 2.0 GHz | 4 núcleos @ 2.5 GHz o superior |
| **RAM** | 4 GB | 8 GB |
| **Almacenamiento** | 10 GB disponibles (SSD) | 20 GB disponibles (SSD NVMe) |
| **Red** | 10 Mbps | 100 Mbps |

### 2.2 Especificaciones para Servidor de Producción (250 usuarios)

Basado en la proyección de 250 usuarios activos no concurrentes:

| Componente | Mínimo | Recomendado | Óptimo |
|------------|--------|-------------|--------|
| **CPU** | 4 núcleos @ 2.5 GHz | 8 núcleos @ 3.0 GHz | 16 núcleos @ 3.5 GHz |
| **RAM** | 8 GB | 16 GB | 32 GB |
| **Almacenamiento** | 50 GB SSD | 100 GB SSD NVMe | 250 GB SSD NVMe |
| **Red** | 100 Mbps | 1 Gbps | 10 Gbps |
| **Ancho de banda** | 500 GB/mes | 1 TB/mes | 2 TB/mes |

### 2.3 Justificación de Requisitos de Hardware

#### **CPU (Procesador)**
- Node.js es single-threaded pero puede aprovechar múltiples núcleos mediante clustering
- Para 250 usuarios no concurrentes, se recomienda al menos 4 núcleos para manejar picos de tráfico
- Express.js puede manejar aproximadamente 50-100 peticiones por segundo por núcleo

#### **RAM (Memoria)**
- Node.js base: 512 MB - 1 GB
- Express.js y dependencias: 1-2 GB
- Sesiones de usuario (250 usuarios): 2-4 GB
- Sistema operativo: 2-4 GB
- Buffer y cache: 2-4 GB
- **Total recomendado: 16 GB para producción**

#### **Almacenamiento**
- Aplicación y dependencias (node_modules): ~500 MB
- Logs de aplicación: 5-10 GB
- Archivos estáticos (imágenes, CSS, JS): 5-10 GB
- Sistema operativo: 20-30 GB
- Espacio para actualizaciones y backups: 20-30 GB
- **Total recomendado: 100 GB SSD**

#### **Red**
- Cada usuario consume aproximadamente 1-5 MB por sesión
- 250 usuarios × 5 MB = 1.25 GB de transferencia
- Con múltiples sesiones al día: 500 GB - 1 TB/mes
- Latencia recomendada: < 50 ms

### 2.4 Comandos de Verificación de Hardware

**Windows:**
```cmd
wmic cpu get name,numberofcores,numberoflogicalprocessors
wmic computersystem get totalphysicalmemory
wmic diskdrive get size,model
```

**Linux:**
```bash
lscpu
free -h
df -h
lsblk
```

**macOS:**
```bash
sysctl -n machdep.cpu.brand_string
sysctl -n hw.ncpu
sysctl -n hw.memsize
df -h
```

---

## 3. SELECCIÓN Y VERIFICACIÓN DEL TIPO DE LICENCIA

### 3.1 Análisis de Licencias del Software Utilizado

#### **3.1.1 Runtime y Framework Principal**

| Software | Licencia | Tipo | Uso Comercial | Costo |
|----------|----------|------|---------------|-------|
| **Node.js** | MIT License | Open Source | ✅ Permitido | Gratuito |
| **Express.js** | MIT License | Open Source | ✅ Permitido | Gratuito |

#### **3.1.2 Dependencias del Proyecto**

Según el archivo `package.json`, las dependencias son:

| Dependencia | Versión | Licencia | Uso Comercial |
|-------------|---------|----------|---------------|
| **bcrypt** | ^6.0.0 | MIT | ✅ Permitido |
| **cors** | ^2.8.5 | MIT | ✅ Permitido |
| **dotenv** | ^17.2.3 | BSD-2-Clause | ✅ Permitido |
| **express** | ^5.1.0 | MIT | ✅ Permitido |
| **express-session** | ^1.18.2 | MIT | ✅ Permitido |
| **jsonwebtoken** | ^9.0.2 | MIT | ✅ Permitido |
| **mongoose** | ^8.15.1 | MIT | ✅ Permitido |
| **nodemailer** | ^7.0.3 | MIT | ✅ Permitido |
| **passport** | ^0.7.0 | MIT | ✅ Permitido |
| **passport-google-oauth20** | ^2.0.0 | MIT | ✅ Permitido |
| **sonarqube-scanner** | ^4.3.2 | LGPL-3.0 | ✅ Permitido* |

*LGPL permite uso comercial siempre que no se modifique la librería

#### **3.1.3 Base de Datos**

| Software | Plan | Licencia | Costo | Límites |
|----------|------|----------|-------|---------|
| **MongoDB Atlas** | Free Tier | SSPL / Propietaria | Gratuito | 512 MB storage |
| **MongoDB Atlas** | M10 (Producción) | SSPL / Propietaria | ~$57/mes | 10 GB storage, 2 GB RAM |
| **MongoDB Atlas** | M20 (Recomendado) | SSPL / Propietaria | ~$140/mes | 20 GB storage, 4 GB RAM |

### 3.2 Licencia Recomendada para el Proyecto MuckSena

#### **Opción 1: Proyecto Educativo (Actual)**
- **Licencia del proyecto:** MIT License o ISC License
- **Justificación:** Permite uso, modificación y distribución libre
- **Costo total:** $0 (usando MongoDB Atlas Free Tier)

#### **Opción 2: Proyecto Comercial**
- **Licencia del proyecto:** Propietaria o MIT License
- **MongoDB Atlas:** Plan M10 o M20 ($57-$140/mes)
- **Servicios adicionales:**
  - Dominio: $10-15/año
  - Certificado SSL: Gratuito (Let's Encrypt)
  - Hosting/VPS: $5-50/mes (DigitalOcean, AWS, Azure)

### 3.3 Verificación de Licencias

**Comando para verificar licencias de dependencias:**

```bash
npm install -g license-checker
license-checker --summary
```

**Verificar licencias específicas:**

```bash
npm list --depth=0
npm view <package-name> license
```

### 3.4 Cumplimiento Legal

✅ **Todas las dependencias utilizan licencias permisivas (MIT, BSD)**  
✅ **No hay conflictos de licencia**  
✅ **Uso comercial permitido sin restricciones**  
✅ **No se requiere liberación de código fuente**  

---

## 4. VERIFICACIÓN DEL SISTEMA DE BASE DE DATOS

### 4.1 Características de MongoDB Atlas

MuckSena utiliza **MongoDB Atlas**, un servicio de base de datos en la nube (DBaaS - Database as a Service) que elimina la necesidad de instalar y mantener MongoDB localmente.

#### **4.1.1 Requisitos de Conectividad**

| Requisito | Especificación |
|-----------|----------------|
| **Conexión a Internet** | Obligatoria, mínimo 10 Mbps |
| **Protocolo** | MongoDB Wire Protocol sobre TCP |
| **Puerto** | 27017 (por defecto) |
| **Encriptación** | TLS/SSL 1.2 o superior |
| **DNS** | Resolución de nombres para *.mongodb.net |

#### **4.1.2 Planes de MongoDB Atlas**

| Plan | RAM | Storage | Conexiones | Precio/mes | Uso Recomendado |
|------|-----|---------|------------|------------|-----------------|
| **M0 (Free)** | Compartida | 512 MB | 500 | $0 | Desarrollo/Pruebas |
| **M10** | 2 GB | 10 GB | 1,500 | ~$57 | Producción pequeña |
| **M20** | 4 GB | 20 GB | 3,000 | ~$140 | Producción media (250 usuarios) |
| **M30** | 8 GB | 40 GB | 6,000 | ~$280 | Producción grande |

**Recomendación para MuckSena (250 usuarios):** Plan M20

### 4.2 Configuración de Conexión

#### **4.2.1 String de Conexión**

```javascript
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database>?retryWrites=true&w=majority
```

#### **4.2.2 Variables de Entorno Requeridas**

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/mucksena
DB_NAME=mucksena
```

### 4.3 Requisitos de Red para MongoDB Atlas

#### **Whitelist de IPs**
- MongoDB Atlas requiere configurar las IPs permitidas para conectarse
- Opciones:
  - IP específica del servidor
  - Rango de IPs
  - 0.0.0.0/0 (cualquier IP - solo para desarrollo)

#### **Puertos de Salida**
- Puerto 27017 (MongoDB)
- Puerto 27018 (MongoDB Sharded Cluster)
- Puerto 27019 (MongoDB Config Server)

### 4.4 Verificación de Conectividad

**Verificar conexión a MongoDB Atlas:**

```bash
# Instalar MongoDB Shell (mongosh)
npm install -g mongosh

# Probar conexión
mongosh "mongodb+srv://cluster.mongodb.net" --username <usuario>
```

**Verificar desde Node.js:**

```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conexión exitosa a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err));
```

### 4.5 Requisitos de Seguridad

| Aspecto | Requisito |
|---------|-----------|
| **Autenticación** | Usuario y contraseña obligatorios |
| **Encriptación** | TLS 1.2+ en tránsito |
| **Network Access** | IP Whitelist configurada |
| **Database Access** | Roles y permisos definidos |
| **Backup** | Automático en planes pagos |

---

## 5. REQUISITOS DE RED Y SEGURIDAD

### 5.1 Puertos Requeridos

| Puerto | Protocolo | Servicio | Dirección | Obligatorio |
|--------|-----------|----------|-----------|-------------|
| **80** | HTTP | Servidor web | Entrada | ✅ |
| **443** | HTTPS | Servidor web seguro | Entrada | ✅ |
| **27017** | TCP | MongoDB Atlas | Salida | ✅ |
| **587** | TCP | SMTP (Nodemailer) | Salida | ✅ |
| **465** | TCP | SMTPS (alternativo) | Salida | ⚠️ |
| **3000** | HTTP | Node.js (desarrollo) | Entrada | Solo dev |

### 5.2 Dominios y Servicios Externos

La aplicación requiere acceso a los siguientes servicios:

| Servicio | Dominio | Propósito |
|----------|---------|-----------|
| **MongoDB Atlas** | *.mongodb.net | Base de datos |
| **Google OAuth** | accounts.google.com | Autenticación |
| **Google APIs** | oauth2.googleapis.com | Tokens OAuth |
| **SMTP Gmail** | smtp.gmail.com | Envío de correos |

### 5.3 Certificados SSL/TLS

#### **Opciones de Certificado:**

1. **Let's Encrypt (Recomendado)**
   - Gratuito
   - Renovación automática cada 90 días
   - Ampliamente confiable

2. **Certificado comercial**
   - DigiCert, Comodo, etc.
   - Costo: $50-200/año
   - Soporte extendido

3. **Certificado autofirmado**
   - Solo para desarrollo
   - No recomendado para producción

#### **Instalación de Certbot (Let's Encrypt):**

**Linux:**
```bash
sudo apt update
sudo apt install certbot
sudo certbot certonly --standalone -d tudominio.com
```

**Windows:**
- Descargar desde: https://certbot.eff.org/
- Usar con IIS o configurar manualmente

### 5.4 Firewall y Seguridad

#### **Reglas de Firewall Recomendadas:**

**Linux (UFW):**
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # SSH
sudo ufw enable
```

**Windows Firewall:**
```powershell
New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "HTTPS" -Direction Inbound -LocalPort 443 -Protocol TCP -Action Allow
```

### 5.5 Variables de Entorno de Seguridad

```env
# JWT
JWT_SECRET=<clave-secreta-fuerte-minimo-32-caracteres>
JWT_EXPIRES_IN=1h

# Session
SESSION_SECRET=<clave-secreta-diferente>

# Google OAuth
GOOGLE_CLIENT_ID=<tu-client-id>.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=<tu-client-secret>
GOOGLE_CALLBACK_URL=https://tudominio.com/auth/google/callback

# Email
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=<app-password-de-gmail>

# MongoDB
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/mucksena

# Entorno
NODE_ENV=production
PORT=443
```

---

## 6. PLAN DE PRUEBAS Y VALIDACIÓN

### 6.1 Checklist de Validación Pre-Despliegue

#### **6.1.1 Sistema Operativo**
- [ ] Sistema operativo compatible instalado
- [ ] Versión del SO actualizada
- [ ] Arquitectura x64 verificada
- [ ] Actualizaciones de seguridad aplicadas

#### **6.1.2 Software Base**
- [ ] Node.js v18.x o v20.x LTS instalado
- [ ] npm v9.x o superior instalado
- [ ] Git instalado y configurado
- [ ] PM2 o gestor de procesos instalado

#### **6.1.3 Hardware**
- [ ] CPU: Mínimo 4 núcleos @ 2.5 GHz
- [ ] RAM: Mínimo 8 GB (recomendado 16 GB)
- [ ] Almacenamiento: Mínimo 50 GB SSD disponibles
- [ ] Red: Mínimo 100 Mbps

#### **6.1.4 Base de Datos**
- [ ] Cuenta de MongoDB Atlas creada
- [ ] Cluster configurado (M10 o superior)
- [ ] Usuario de base de datos creado
- [ ] IP del servidor en whitelist
- [ ] String de conexión probado

#### **6.1.5 Red y Seguridad**
- [ ] Puertos 80 y 443 abiertos
- [ ] Certificado SSL instalado
- [ ] Firewall configurado
- [ ] DNS configurado correctamente
- [ ] Acceso a servicios externos verificado

#### **6.1.6 Configuración de Aplicación**
- [ ] Variables de entorno configuradas
- [ ] Archivo .env creado (no subir a Git)
- [ ] Dependencias instaladas (npm install)
- [ ] Build de producción generado
- [ ] Logs configurados

### 6.2 Scripts de Validación Automatizada

#### **6.2.1 Script de Validación de Sistema (Linux/macOS)**

```bash
#!/bin/bash

echo "=== VALIDACIÓN DE SISTEMA PARA MUCKSENA ==="
echo ""

# Verificar SO
echo "1. Sistema Operativo:"
uname -a
echo ""

# Verificar CPU
echo "2. CPU:"
lscpu | grep "Model name"
lscpu | grep "CPU(s):"
echo ""

# Verificar RAM
echo "3. Memoria RAM:"
free -h | grep "Mem:"
echo ""

# Verificar Disco
echo "4. Almacenamiento:"
df -h | grep -E "/$|/home"
echo ""

# Verificar Node.js
echo "5. Node.js:"
node --version || echo "❌ Node.js no instalado"
npm --version || echo "❌ npm no instalado"
echo ""

# Verificar Git
echo "6. Git:"
git --version || echo "❌ Git no instalado"
echo ""

# Verificar conectividad
echo "7. Conectividad:"
ping -c 3 mongodb.net > /dev/null 2>&1 && echo "✅ MongoDB Atlas accesible" || echo "❌ No se puede alcanzar MongoDB Atlas"
ping -c 3 google.com > /dev/null 2>&1 && echo "✅ Internet accesible" || echo "❌ Sin conexión a internet"
echo ""

echo "=== FIN DE VALIDACIÓN ==="
```

#### **6.2.2 Script de Validación de Sistema (Windows)**

```powershell
Write-Host "=== VALIDACIÓN DE SISTEMA PARA MUCKSENA ===" -ForegroundColor Cyan
Write-Host ""

# Verificar SO
Write-Host "1. Sistema Operativo:" -ForegroundColor Yellow
Get-ComputerInfo | Select-Object OsName, OsVersion, OsArchitecture
Write-Host ""

# Verificar CPU
Write-Host "2. CPU:" -ForegroundColor Yellow
Get-WmiObject Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors
Write-Host ""

# Verificar RAM
Write-Host "3. Memoria RAM:" -ForegroundColor Yellow
$ram = Get-WmiObject Win32_ComputerSystem
$ramGB = [math]::Round($ram.TotalPhysicalMemory / 1GB, 2)
Write-Host "RAM Total: $ramGB GB"
Write-Host ""

# Verificar Disco
Write-Host "4. Almacenamiento:" -ForegroundColor Yellow
Get-PSDrive -PSProvider FileSystem | Where-Object {$_.Used -gt 0}
Write-Host ""

# Verificar Node.js
Write-Host "5. Node.js:" -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js: $nodeVersion"
    $npmVersion = npm --version
    Write-Host "✅ npm: $npmVersion"
} catch {
    Write-Host "❌ Node.js no instalado" -ForegroundColor Red
}
Write-Host ""

# Verificar Git
Write-Host "6. Git:" -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✅ $gitVersion"
} catch {
    Write-Host "❌ Git no instalado" -ForegroundColor Red
}
Write-Host ""

# Verificar conectividad
Write-Host "7. Conectividad:" -ForegroundColor Yellow
if (Test-Connection -ComputerName mongodb.net -Count 2 -Quiet) {
    Write-Host "✅ MongoDB Atlas accesible" -ForegroundColor Green
} else {
    Write-Host "❌ No se puede alcanzar MongoDB Atlas" -ForegroundColor Red
}
if (Test-Connection -ComputerName google.com -Count 2 -Quiet) {
    Write-Host "✅ Internet accesible" -ForegroundColor Green
} else {
    Write-Host "❌ Sin conexión a internet" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== FIN DE VALIDACIÓN ===" -ForegroundColor Cyan
```

### 6.3 Métricas de Rendimiento Esperadas

| Métrica | Valor Mínimo | Valor Óptimo |
|---------|--------------|--------------|
| **Tiempo de respuesta promedio** | < 500 ms | < 200 ms |
| **Tiempo de respuesta p95** | < 1000 ms | < 500 ms |
| **Peticiones por segundo** | > 100 | > 500 |
| **Tasa de error** | < 1% | < 0.1% |
| **Uso de CPU** | < 80% | < 60% |
| **Uso de RAM** | < 80% | < 70% |
| **Tiempo de carga inicial** | < 3 s | < 1.5 s |

---

## 7. PROCEDIMIENTO DE INSTALACIÓN Y CONFIGURACIÓN

### 7.1 Instalación de Node.js

#### **Linux (Ubuntu/Debian):**
```bash
# Instalar Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalación
node --version
npm --version
```

#### **Windows:**
1. Descargar instalador desde: https://nodejs.org/
2. Ejecutar el instalador (recomendado: versión LTS)
3. Verificar en CMD: `node --version`

#### **macOS:**
```bash
# Usando Homebrew
brew install node@20

# Verificar instalación
node --version
npm --version
```

### 7.2 Instalación de PM2 (Gestor de Procesos)

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Verificar instalación
pm2 --version
```

### 7.3 Clonación y Configuración del Proyecto

```bash
# Clonar repositorio
git clone <url-del-repositorio> mucksena
cd mucksena

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env
nano .env  # Editar con las variables correctas
```

### 7.4 Configuración de Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Servidor
NODE_ENV=production
PORT=3000
BASE_URL=https://tudominio.com

# Base de datos
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/mucksena?retryWrites=true&w=majority

# JWT
JWT_SECRET=tu-clave-secreta-muy-segura-minimo-32-caracteres
JWT_EXPIRES_IN=1h

# Session
SESSION_SECRET=otra-clave-secreta-diferente-para-sesiones

# Google OAuth
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret
GOOGLE_CALLBACK_URL=https://tudominio.com/auth/google/callback

# Email (Nodemailer con Gmail)
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password-de-gmail
EMAIL_FROM=MuckSena <noreply@tudominio.com>

# CORS
CORS_ORIGIN=https://tudominio.com
```

### 7.5 Despliegue con PM2

```bash
# Iniciar aplicación
pm2 start server.js --name mucksena

# Configurar inicio automático
pm2 startup
pm2 save

# Ver logs
pm2 logs mucksena

# Monitorear
pm2 monit

# Reiniciar
pm2 restart mucksena

# Detener
pm2 stop mucksena
```

### 7.6 Configuración de Nginx como Reverse Proxy

Instalar Nginx:
```bash
sudo apt update
sudo apt install nginx
```

Crear configuración `/etc/nginx/sites-available/mucksena`:

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;
    
    # Redirigir a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name tudominio.com www.tudominio.com;

    # Certificados SSL
    ssl_certificate /etc/letsencrypt/live/tudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tudominio.com/privkey.pem;

    # Configuración SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Logs
    access_log /var/log/nginx/mucksena_access.log;
    error_log /var/log/nginx/mucksena_error.log;

    # Proxy a Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Archivos estáticos
    location /static {
        alias /var/www/mucksena/public;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

Activar configuración:
```bash
sudo ln -s /etc/nginx/sites-available/mucksena /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 8. MONITOREO Y MANTENIMIENTO

### 8.1 Herramientas de Monitoreo

| Herramienta | Propósito | Instalación |
|-------------|-----------|-------------|
| **PM2 Monitoring** | Monitoreo de procesos Node.js | Incluido con PM2 |
| **MongoDB Atlas Monitoring** | Métricas de base de datos | Incluido en Atlas |
| **Nginx Access Logs** | Análisis de tráfico | Incluido con Nginx |
| **Node.js Performance Hooks** | Métricas de rendimiento | Nativo en Node.js |

### 8.2 Logs de Aplicación

Configurar Winston para logging:

```bash
npm install winston
```

### 8.3 Backups

#### **Base de Datos (MongoDB Atlas):**
- Backups automáticos en planes M10+
- Retención: 7 días (configurable)
- Restauración desde el panel de Atlas

#### **Código y Configuración:**
```bash
# Backup manual
tar -czf backup-$(date +%Y%m%d).tar.gz /ruta/a/mucksena

# Backup automatizado con cron
0 2 * * * tar -czf /backups/mucksena-$(date +\%Y\%m\%d).tar.gz /var/www/mucksena
```

### 8.4 Actualizaciones

```bash
# Actualizar dependencias
npm update

# Verificar vulnerabilidades
npm audit
npm audit fix

# Actualizar Node.js (usando nvm)
nvm install 20
nvm use 20
```

---

## 9. SOLUCIÓN DE PROBLEMAS COMUNES

### 9.1 Problemas de Conexión a MongoDB

**Síntoma:** Error "MongoNetworkError" o "connection timeout"

**Soluciones:**
1. Verificar IP en whitelist de MongoDB Atlas
2. Verificar string de conexión
3. Verificar conectividad: `ping mongodb.net`
4. Verificar firewall del servidor

### 9.2 Problemas de Memoria

**Síntoma:** Aplicación se detiene o responde lento

**Soluciones:**
1. Aumentar límite de memoria de Node.js:
   ```bash
   node --max-old-space-size=4096 server.js
   ```
2. Verificar memory leaks con `node --inspect`
3. Reiniciar aplicación: `pm2 restart mucksena`

### 9.3 Problemas de Autenticación OAuth

**Síntoma:** Error en login con Google

**Soluciones:**
1. Verificar GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET
2. Verificar GOOGLE_CALLBACK_URL en Google Console
3. Verificar que el dominio esté autorizado en Google Console

### 9.4 Problemas de Certificado SSL

**Síntoma:** Advertencia de certificado en navegador

**Soluciones:**
1. Renovar certificado Let's Encrypt:
   ```bash
   sudo certbot renew
   sudo systemctl restart nginx
   ```
2. Verificar fechas de expiración:
   ```bash
   openssl x509 -in /etc/letsencrypt/live/tudominio.com/cert.pem -noout -dates
   ```

---

## 10. CONCLUSIONES Y RECOMENDACIONES

### 10.1 Resumen de Requisitos Validados

✅ **Sistema Operativo:** Linux Ubuntu 20.04+ (recomendado) o Windows Server 2019+  
✅ **Hardware Mínimo:** 4 CPU cores, 8 GB RAM, 50 GB SSD  
✅ **Hardware Recomendado:** 8 CPU cores, 16 GB RAM, 100 GB SSD NVMe  
✅ **Software Base:** Node.js v18.x/v20.x LTS, npm v9+, PM2  
✅ **Base de Datos:** MongoDB Atlas M20 (4 GB RAM, 20 GB storage)  
✅ **Licencias:** Todas las dependencias usan licencias permisivas (MIT/BSD)  
✅ **Red:** Puertos 80/443 abiertos, certificado SSL, acceso a servicios externos  

### 10.2 Recomendaciones Finales

1. **Para Entorno de Producción:**
   - Usar Linux (Ubuntu Server 22.04 LTS) por estabilidad y rendimiento
   - Implementar MongoDB Atlas M20 o superior
   - Configurar Nginx como reverse proxy
   - Implementar certificado SSL con Let's Encrypt
   - Usar PM2 para gestión de procesos
   - Configurar backups automáticos

2. **Para Escalabilidad Futura:**
   - Considerar clustering de Node.js para aprovechar múltiples núcleos
   - Implementar Redis para caché y sesiones
   - Usar CDN para archivos estáticos
   - Implementar balanceador de carga si se superan 500 usuarios

3. **Para Seguridad:**
   - Mantener todas las dependencias actualizadas
   - Ejecutar `npm audit` regularmente
   - Implementar rate limiting
   - Configurar CORS correctamente
   - Usar variables de entorno para secretos
   - Implementar logging y monitoreo

4. **Para Mantenimiento:**
   - Establecer rutina de backups diarios
   - Monitorear métricas de rendimiento
   - Revisar logs semanalmente
   - Actualizar Node.js cada 6 meses
   - Renovar certificados SSL automáticamente

### 10.3 Costos Estimados

#### **Opción 1: Entorno de Desarrollo (Gratuito)**
- MongoDB Atlas M0: $0
- Hosting local: $0
- **Total: $0/mes**

#### **Opción 2: Producción Básica**
- VPS (DigitalOcean/Linode): $12/mes
- MongoDB Atlas M10: $57/mes
- Dominio: $1/mes
- **Total: ~$70/mes**

#### **Opción 3: Producción Recomendada (250 usuarios)**
- VPS (4 CPU, 8 GB RAM): $24/mes
- MongoDB Atlas M20: $140/mes
- Dominio: $1/mes
- **Total: ~$165/mes**

### 10.4 Próximos Pasos

1. Ejecutar scripts de validación de sistema
2. Instalar y configurar software base
3. Configurar MongoDB Atlas
4. Clonar y configurar aplicación
5. Ejecutar pruebas de carga
6. Configurar monitoreo
7. Realizar despliegue en producción
8. Documentar procedimientos operativos

---

## ANEXOS

### Anexo A: Comandos Útiles

```bash
# Verificar estado de PM2
pm2 status
pm2 logs
pm2 monit

# Verificar uso de recursos
top
htop
free -h
df -h

# Verificar puertos abiertos
netstat -tulpn | grep LISTEN
ss -tulpn | grep LISTEN

# Verificar logs de Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Verificar conexión a MongoDB
mongosh "mongodb+srv://cluster.mongodb.net" --username usuario

# Renovar certificado SSL
sudo certbot renew --dry-run
sudo certbot renew
```

### Anexo B: Referencias

- **Node.js Documentation:** https://nodejs.org/docs/
- **Express.js Guide:** https://expressjs.com/
- **MongoDB Atlas Documentation:** https://docs.atlas.mongodb.com/
- **PM2 Documentation:** https://pm2.keymetrics.io/docs/
- **Nginx Documentation:** https://nginx.org/en/docs/
- **Let's Encrypt:** https://letsencrypt.org/
- **OAuth 2.0 Google:** https://developers.google.com/identity/protocols/oauth2

### Anexo C: Contacto y Soporte

**Proyecto:** MuckSena  
**Autor:** Arlex Amado  
**Programa:** Análisis y Desarrollo de Software - SENA  
**Fecha:** Noviembre 2025  

---

**FIN DEL DOCUMENTO**
