# GUÍA PASO A PASO - LLENAR EXCEL DE PLAN DE PRUEBAS

## 📋 PARTE 1: DATOS GENERALES (Primera página del Excel)

Copia esto exactamente como está en tu Excel:

```
Programa de formación: Análisis y desarrollo de software
Proyecto formativo: Construcción de software integrador de tecnologías orientadas a servicios
Fase proyecto: Ejecución
Resultado de aprendizaje: 220501096-05 Realizar pruebas al software para verificar su funcionalidad
Actividad de aprendizaje: GA9-220501096-AA1- Realizar plan de pruebas
Evidencia de desempeño: Realiza plan pruebas de software - GA9-220501096-AA1-EV02
```

**Criterios de evaluación** (copia estos 4 puntos):
- Diseña casos de prueba para comprobar la funcionalidad del software especificada en los casos de uso
- Define el ambiente de pruebas de acuerdo con las condiciones del entorno de producción
- Realiza pruebas al software de acuerdo con el plan de pruebas
- Documenta las pruebas realizadas para mantener la trazabilidad en el comportamiento del software

---

## 📋 PARTE 2: LISTA DE CHEQUEO (Segunda página)

Esta es una tabla con 7 filas. Copia esto:

| No. | VARIABLES/INDICADORES DE LOGRO | CUMPLE SÍ | CUMPLE NO | Observaciones |
|-----|--------------------------------|-----------|-----------|---------------|
| 1. | Realiza el plan de pruebas | ✓ | | 20% |
| 2. | Analizó los requerimientos y las funcionalidades existentes | ✓ | | 10% |
| 3. | Definió estrategias y entornos de trabajo | ✓ | | 20% |
| 4. | Entregó el modelo de los artefactos que necesitará para llevar el registro en las pruebas | ✓ | | 15% |
| 5. | Hace un listado de la o las posibles aplicaciones que utilizará para realizar las pruebas del software | ✓ | | 10% |
| 6. | Identificó los riesgos y propuso contingencias | ✓ | | 10% |
| 7. | Realizó el trabajo con las normas básicas de presentación de un documento escrito | ✓ | | 15% |

**Total: 100%**

---

## 📋 PARTE 3: ANÁLISIS DE REQUERIMIENTOS

### Requerimientos Funcionales Existentes:

**1. Autenticación de Usuarios**
- Login con email y contraseña
- Autenticación OAuth con Google
- Registro de nuevos usuarios
- Recuperación de contraseña mediante email
- Cierre de sesión seguro

**2. Gestión de Perfil de Usuario**
- Visualización de datos personales
- Edición de información (nombre, biografía, sitio web)
- Cambio de contraseña con validación
- Carga y actualización de foto de perfil (avatar)
- Configuración de perfil público/privado

**3. Catálogo y Búsqueda de Cursos**
- Listado de cursos disponibles con imágenes
- Búsqueda de cursos por nombre
- Filtrado por categorías (Desarrollo, Diseño, Marketing, etc.)
- Visualización de detalles del curso (instructor, rating, descripción)
- Carrusel de tecnologías con tooltips

**4. Compra y Gestión de Cursos**
- Agregar curso al carrito de compras
- Proceso de compra simulado
- Historial de compras del usuario
- Almacenamiento en base de datos MongoDB

**5. Mis Cursos Comprados**
- Listado de cursos adquiridos por el usuario
- Seguimiento de progreso de cada curso (0-100%)
- Filtrado (todos, en progreso, completados)
- Búsqueda dentro de mis cursos
- Fecha de última visualización

**6. Gestión de Datos y Seguridad**
- Almacenamiento persistente en MongoDB
- Tokens JWT para autenticación
- Encriptación de contraseñas con bcrypt
- Sincronización entre localStorage y base de datos
- Protección CORS para peticiones

### Funcionalidades Nuevas a Probar:

**1. Sistema de Notificaciones**
- Notificaciones de nuevos cursos
- Alertas de progreso
- Configuración de preferencias de notificación

**2. Sistema de Créditos**
- Balance de créditos del usuario
- Compra de créditos
- Historial de transacciones

**3. Lista de Deseos**
- Guardar cursos para comprar después
- Gestión de wishlist

---

## 📋 PARTE 4: ESTRATEGIAS Y ENTORNOS

### Estrategia de Pruebas:

**Tipos de Pruebas a Realizar:**

1. **Pruebas Funcionales**
   - Verificar que cada función hace lo que debe hacer
   - Probar con datos válidos e inválidos
   - Verificar mensajes de error

2. **Pruebas de Seguridad**
   - Verificar encriptación de contraseñas
   - Probar protección de rutas con tokens
   - Intentar inyección SQL y XSS

3. **Pruebas de Usabilidad**
   - Verificar que la interfaz es intuitiva
   - Probar en diferentes navegadores
   - Verificar diseño responsive

4. **Pruebas de Rendimiento**
   - Medir tiempos de carga
   - Verificar optimización de imágenes
   - Probar con múltiples usuarios

### Entornos de Trabajo:

| Entorno | Descripción | URL/Ubicación |
|---------|-------------|---------------|
| Desarrollo | Computadora local | http://localhost:3000 |
| Frontend | Live Server | http://127.0.0.1:5501 |
| Base de Datos | MongoDB Atlas | Cloud (conexión remota) |
| Pruebas API | Insomnia | Aplicación local |

### Software y Hardware Requerido:

**Software:**
- Node.js v18 o superior
- MongoDB (Atlas Cloud)
- Navegador Google Chrome
- Insomnia (para pruebas de API)
- Visual Studio Code (editor)
- Git (control de versiones)

**Hardware:**
- Computadora con Windows 10/11
- Mínimo 8GB RAM
- Conexión a Internet estable
- Espacio en disco: 2GB

---

## 📋 PARTE 5: ARTEFACTOS Y HERRAMIENTAS

### Artefactos para Registro de Pruebas:

**1. Colección de Insomnia** (Ya creada)
- Archivo: `Insomnia_MuckSena_Collection.json`
- Contiene: 18 peticiones organizadas
- Uso: Importar en Insomnia para probar APIs

**2. Plantilla de Casos de Prueba**
- Formato: Tabla con columnas
  - ID del caso
  - Nombre del caso
  - Objetivo
  - Pasos a seguir
  - Resultado esperado
  - Resultado obtenido
  - Estado (PASS/FAIL)

**3. Registro de Defectos**
- Formato: Tabla con columnas
  - ID del defecto
  - Descripción
  - Severidad (Crítica/Alta/Media/Baja)
  - Estado (Abierto/Cerrado)
  - Fecha de reporte

**4. Capturas de Pantalla**
- Evidencias de pruebas exitosas
- Evidencias de errores encontrados
- Guardadas en carpeta: `evidencias/`

### Herramientas a Utilizar:

**1. Insomnia** (Principal para APIs)
- Propósito: Probar endpoints del backend
- Qué probar: Login, registro, perfil, cursos
- Cómo: Importar colección JSON y ejecutar

**2. Navegador Chrome DevTools**
- Propósito: Depurar frontend
- Qué probar: Interfaz, errores JavaScript
- Cómo: F12 → Console, Network, Application

**3. MongoDB Compass**
- Propósito: Verificar datos en base de datos
- Qué probar: Usuarios, cursos comprados
- Cómo: Conectar a MongoDB Atlas y consultar

**4. Pruebas Manuales en Navegador**
- Propósito: Probar flujo completo de usuario
- Qué probar: Registro, login, compra de cursos
- Cómo: Usar la aplicación como usuario real

---

## 📋 PARTE 6: CASOS DE PRUEBA ESPECÍFICOS

### CASO 1: Registro de Usuario

**ID:** CP-001  
**Nombre:** Registro exitoso de nuevo usuario  
**Objetivo:** Verificar que un usuario puede registrarse correctamente

**Pasos:**
1. Abrir http://127.0.0.1:5501/dashboard.html
2. Click en "Regístrate"
3. Ingresar:
   - Usuario: "testuser"
   - Email: "test@example.com"
   - Contraseña: "Test123"
4. Click en "Crear cuenta"

**Resultado Esperado:**
- Mensaje: "¡Usuario registrado! Ahora puedes iniciar sesión"
- Usuario guardado en MongoDB
- Modal se cierra

**Cómo Probarlo:**
1. Abre el navegador
2. Ve a la página
3. Sigue los pasos
4. Toma captura de pantalla del resultado

---

### CASO 2: Login con Credenciales Correctas

**ID:** CP-002  
**Nombre:** Login exitoso  
**Objetivo:** Verificar que un usuario puede iniciar sesión

**Pasos:**
1. Abrir dashboard.html
2. Ingresar email: "test@example.com"
3. Ingresar contraseña: "Test123"
4. Click en "Iniciar sesión"

**Resultado Esperado:**
- Redirección a home.html
- Nombre de usuario visible en navbar
- Token JWT guardado

**Cómo Probarlo:**
1. Usa el usuario que registraste en CP-001
2. Ingresa las credenciales
3. Verifica que te lleva a home.html
4. Abre DevTools (F12) → Application → Local Storage
5. Verifica que existe "session" con el token

---

### CASO 3: Login con Contraseña Incorrecta

**ID:** CP-003  
**Nombre:** Login fallido por contraseña incorrecta  
**Objetivo:** Verificar manejo de error

**Pasos:**
1. Abrir dashboard.html
2. Ingresar email: "test@example.com"
3. Ingresar contraseña: "WrongPassword"
4. Click en "Iniciar sesión"

**Resultado Esperado:**
- Mensaje de error: "Contraseña incorrecta"
- No hay redirección
- Usuario permanece en login

**Cómo Probarlo:**
1. Ingresa contraseña incorrecta a propósito
2. Observa el mensaje de error
3. Toma captura de pantalla

---

### CASO 4: Comprar un Curso

**ID:** CP-004  
**Nombre:** Compra exitosa de curso  
**Objetivo:** Verificar que se puede comprar un curso

**Pasos:**
1. Iniciar sesión
2. En home.html, buscar un curso
3. Click en el curso
4. Click en "Agregar al carrito"
5. Ir a "Mis Cursos"

**Resultado Esperado:**
- Notificación: "Curso agregado a tus cursos"
- Curso aparece en "Mis Cursos"
- Curso guardado en MongoDB

**Cómo Probarlo:**
1. Inicia sesión primero
2. Navega por los cursos
3. Compra uno
4. Verifica en "Mis Cursos"
5. Abre MongoDB Compass y verifica que está en purchasedCourses

---

### CASO 5: Cambiar Avatar

**ID:** CP-005  
**Nombre:** Actualización de foto de perfil  
**Objetivo:** Verificar carga de imagen

**Pasos:**
1. Ir a perfil.html
2. Pasar mouse sobre avatar
3. Click en icono de cámara
4. Seleccionar imagen (< 5MB)
5. Esperar confirmación

**Resultado Esperado:**
- Imagen se muestra inmediatamente
- Notificación: "Avatar actualizado exitosamente"
- Imagen optimizada a 400x400px

**Cómo Probarlo:**
1. Ve a tu perfil
2. Sube una foto
3. Verifica que se ve bien
4. Recarga la página y verifica que persiste

---

## 📋 PARTE 7: RIESGOS Y CONTINGENCIAS

| Riesgo | Probabilidad | Impacto | Plan de Contingencia |
|--------|--------------|---------|---------------------|
| Servidor MongoDB no disponible | Media | Alto | Usar localStorage como respaldo temporal |
| Token JWT expira durante pruebas | Alta | Medio | Volver a hacer login |
| Imagen muy grande causa error | Media | Medio | Sistema rechaza automáticamente (validación) |
| Error en OAuth de Google | Baja | Alto | Usar login tradicional como alternativa |
| Navegador no compatible | Baja | Medio | Probar en Chrome (navegador principal) |
| Pérdida de conexión a Internet | Media | Alto | Algunas funciones usan localStorage |

---

## 📋 PARTE 8: CÓMO HACER LAS PRUEBAS (PASO A PASO)

### OPCIÓN 1: Pruebas Manuales en el Navegador

**Paso 1: Preparar el Entorno**
```
1. Abre una terminal
2. Navega a la carpeta del proyecto
3. Ejecuta: node js/server.js
4. Verifica que dice: "Servidor backend en http://localhost:3000"
5. Abre otro navegador en: http://127.0.0.1:5501/dashboard.html
```

**Paso 2: Probar Registro**
```
1. Click en "Regístrate"
2. Llena el formulario
3. Click en "Crear cuenta"
4. ¿Funcionó? → Anota: CP-001 = PASS ✅
5. ¿No funcionó? → Anota: CP-001 = FAIL ❌ y describe el error
```

**Paso 3: Probar Login**
```
1. Ingresa email y contraseña
2. Click en "Iniciar sesión"
3. ¿Te llevó a home.html? → CP-002 = PASS ✅
4. Toma captura de pantalla
```

**Paso 4: Probar Compra de Curso**
```
1. En home.html, busca un curso
2. Click en el curso
3. Click en "Agregar al carrito"
4. Ve a "Mis Cursos"
5. ¿Aparece el curso? → CP-004 = PASS ✅
```

### OPCIÓN 2: Pruebas con Insomnia (APIs)

**Paso 1: Instalar e Importar**
```
1. Descarga Insomnia de: https://insomnia.rest/download
2. Instala
3. Abre Insomnia
4. Click en "Import" → "From File"
5. Selecciona: docs/Insomnia_MuckSena_Collection.json
```

**Paso 2: Configurar Variables**
```
1. Click en el dropdown de entornos
2. Selecciona "Base Environment"
3. Verifica:
   - base_url: http://localhost:3000
   - test_email: test@example.com
   - test_password: Test123
```

**Paso 3: Ejecutar Prueba de Registro**
```
1. En Insomnia, busca: "CP-AUTH-001: Registro de Usuario"
2. Click en "Send"
3. Mira la respuesta:
   - Status 200 = PASS ✅
   - Status 400/500 = FAIL ❌
4. Copia el resultado
```

**Paso 4: Ejecutar Prueba de Login**
```
1. Busca: "CP-AUTH-002: Login Exitoso"
2. Click en "Send"
3. Copia el "token" de la respuesta
4. Ve a variables de entorno
5. Pega el token en la variable "token"
6. Guarda
```

**Paso 5: Probar Endpoints Protegidos**
```
1. Busca: "Obtener Perfil del Usuario"
2. Click en "Send"
3. Debe mostrar tus datos
4. Si da error 401 = token no configurado
```

---

## 📋 PARTE 9: PLANTILLA DE RESULTADOS

Copia esta tabla y llénala mientras haces las pruebas:

| ID | Caso de Prueba | Fecha | Resultado | Tiempo | Observaciones |
|----|----------------|-------|-----------|--------|---------------|
| CP-001 | Registro de usuario | [Fecha] | ✅ PASS | 2 seg | Funciona correctamente |
| CP-002 | Login exitoso | [Fecha] | ✅ PASS | 1 seg | Redirección correcta |
| CP-003 | Login con error | [Fecha] | ✅ PASS | 1 seg | Muestra mensaje de error |
| CP-004 | Comprar curso | [Fecha] | ✅ PASS | 3 seg | Curso en MongoDB |
| CP-005 | Cambiar avatar | [Fecha] | ✅ PASS | 2 seg | Imagen optimizada |

**Cálculo de Éxito:**
- Total de casos: 5
- Casos PASS: 5
- Porcentaje: (5/5) × 100 = 100% ✅

---

## 📋 PARTE 10: EVIDENCIAS A ENTREGAR

1. **Excel completado** con todas las hojas llenas
2. **Capturas de pantalla** de:
   - Registro exitoso
   - Login exitoso
   - Compra de curso
   - Mis cursos con progreso
   - Cambio de avatar
   - Pruebas en Insomnia
3. **Documento PDF** con el plan de pruebas
4. **Colección de Insomnia** exportada

---

¿Necesitas que te explique alguna parte específica con más detalle?
