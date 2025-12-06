# GUÍA: INTEGRAR SONARCLOUD CON GITHUB

## 🌐 OPCIÓN 1: SONARCLOUD (Recomendado)

SonarCloud es gratuito para proyectos públicos de GitHub y se integra automáticamente.

### Paso 1: Crear cuenta en SonarCloud

1. Ve a: https://sonarcloud.io/
2. Click en **"Sign up"**
3. Selecciona **"With GitHub"**
4. Autoriza SonarCloud a acceder a tu GitHub

### Paso 2: Importar tu Repositorio

1. En SonarCloud, click en **"+"** (arriba derecha)
2. Selecciona **"Analyze new project"**
3. Busca tu repositorio **"MuckSena"**
4. Click en **"Set Up"**

### Paso 3: Configurar el Análisis

1. Selecciona **"With GitHub Actions"** (recomendado)
2. SonarCloud te dará un token
3. Copia el token (lo necesitarás)

### Paso 4: Agregar GitHub Actions

Crea este archivo en tu repositorio:

**`.github/workflows/sonarcloud.yml`**

```yaml
name: SonarCloud Analysis

on:
  push:
    branches:
      - main
      - master
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarcloud:
    name: SonarCloud
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0  # Shallow clones should be disabled for better analysis
      
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

### Paso 5: Agregar el Token a GitHub

1. Ve a tu repositorio en GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Click en **"New repository secret"**
4. Name: `SONAR_TOKEN`
5. Value: [Pega el token de SonarCloud]
6. Click **"Add secret"**

### Paso 6: Crear archivo de configuración

Crea este archivo en la raíz de tu proyecto:

**`sonar-project.properties`**

```properties
sonar.projectKey=tu-usuario_MuckSena
sonar.organization=tu-organizacion

# Información del proyecto
sonar.projectName=MuckSena - Plataforma de Cursos
sonar.projectVersion=1.0

# Código fuente
sonar.sources=.
sonar.exclusions=node_modules/**,*.min.js,docs/**,*.md

# Codificación
sonar.sourceEncoding=UTF-8
```

### Paso 7: Hacer Push

```bash
git add .
git commit -m "Add SonarCloud integration"
git push origin main
```

### Paso 8: Ver Resultados

1. Ve a la pestaña **"Actions"** en GitHub
2. Verás el workflow ejecutándose
3. Cuando termine, ve a https://sonarcloud.io/
4. Verás tu proyecto con los resultados

### Paso 9: Agregar Badge (Opcional)

Agrega esto a tu `README.md`:

```markdown
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=tu-usuario_MuckSena&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=tu-usuario_MuckSena)
```

---

## 🔧 OPCIÓN 2: GITHUB ACTIONS CON SONARQUBE LOCAL

Si quieres usar tu SonarQube local pero analizar desde GitHub:

### Archivo: `.github/workflows/sonar-local.yml`

```yaml
name: SonarQube Local Analysis

on:
  push:
    branches:
      - main
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarqube:
    name: SonarQube Analysis
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: SonarQube Scan
        uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
```

**Nota**: Necesitas exponer tu SonarQube local a internet (usando ngrok o similar).

---

## 🐳 OPCIÓN 3: DOCKER + GITHUB ACTIONS

### Archivo: `.github/workflows/sonar-docker.yml`

```yaml
name: SonarQube Docker Analysis

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  sonarqube:
    runs-on: ubuntu-latest
    
    services:
      sonarqube:
        image: sonarqube:latest
        ports:
          - 9000:9000
        options: >-
          --health-cmd "curl -f http://localhost:9000/api/system/status || exit 1"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Wait for SonarQube
        run: |
          timeout 300 bash -c 'until curl -f http://localhost:9000/api/system/status; do sleep 5; done'
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Scanner
        run: npm install -g sonarqube-scanner
      
      - name: Run Analysis
        run: |
          sonar-scanner \
            -Dsonar.projectKey=MuckSena \
            -Dsonar.sources=. \
            -Dsonar.host.url=http://localhost:9000 \
            -Dsonar.login=admin \
            -Dsonar.password=admin
```

---

## 📊 OPCIÓN 4: ANÁLISIS MANUAL DESDE GITHUB

Si solo quieres analizar el código de GitHub sin automatización:

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/MuckSena.git
cd MuckSena
```

### Paso 2: Ejecutar análisis local

```bash
node run-sonar-simple.js
```

### Paso 3: Ver resultados

http://localhost:9000

---

## 🎯 COMPARACIÓN DE OPCIONES

| Característica | SonarCloud | GitHub Actions + Local | Docker | Manual |
|----------------|------------|------------------------|--------|--------|
| **Gratis** | ✅ (público) | ❌ (requiere servidor) | ✅ | ✅ |
| **Automático** | ✅ | ✅ | ✅ | ❌ |
| **Fácil Setup** | ✅✅✅ | ⚠️ | ⚠️ | ✅✅ |
| **Resultados Online** | ✅ | ❌ | ❌ | ❌ |
| **Badge en README** | ✅ | ❌ | ❌ | ❌ |
| **Historial** | ✅ | ✅ | ⚠️ | ❌ |

---

## 🏆 RECOMENDACIÓN

### Para tu evidencia del SENA:

**Usa SonarCloud (Opción 1)** porque:

1. ✅ Es gratis para proyectos públicos
2. ✅ Se integra automáticamente con GitHub
3. ✅ Genera reportes profesionales online
4. ✅ Puedes compartir el link en tu evidencia
5. ✅ Tiene badge para tu README
6. ✅ Análisis automático en cada push
7. ✅ No requiere servidor propio

### Ventajas adicionales:

- 📊 Dashboard profesional online
- 🔄 Análisis automático en cada commit
- 📈 Historial de calidad del código
- 🎯 Integración con Pull Requests
- 🏅 Badge de calidad en tu README

---

## 📝 CHECKLIST DE IMPLEMENTACIÓN

### SonarCloud Setup:

- [ ] Crear cuenta en SonarCloud
- [ ] Conectar con GitHub
- [ ] Importar repositorio MuckSena
- [ ] Copiar token de SonarCloud
- [ ] Agregar token a GitHub Secrets
- [ ] Crear archivo `.github/workflows/sonarcloud.yml`
- [ ] Crear archivo `sonar-project.properties`
- [ ] Hacer commit y push
- [ ] Verificar que el workflow se ejecute
- [ ] Ver resultados en SonarCloud
- [ ] Agregar badge al README (opcional)
- [ ] Tomar capturas para evidencia

---

## 🔗 ENLACES ÚTILES

- **SonarCloud**: https://sonarcloud.io/
- **Documentación**: https://docs.sonarcloud.io/
- **GitHub Actions**: https://github.com/features/actions
- **SonarCloud GitHub Action**: https://github.com/SonarSource/sonarcloud-github-action

---

## 💡 TIPS PARA LA EVIDENCIA

1. **Captura el Dashboard de SonarCloud**
   - Muestra que está conectado con GitHub
   - Incluye el link público

2. **Captura el GitHub Action ejecutándose**
   - Pestaña "Actions" en GitHub
   - Muestra el workflow exitoso

3. **Agrega el Badge al README**
   - Demuestra integración continua
   - Se ve profesional

4. **Exporta el reporte**
   - SonarCloud permite exportar PDF
   - Incluye en tu evidencia

5. **Documenta el proceso**
   - Capturas de cada paso
   - Explica la integración CI/CD

---

## ⚠️ SOLUCIÓN DE PROBLEMAS

### Error: "Project key already exists"
**Solución**: Usa un nombre único en `sonar.projectKey`

### Error: "SONAR_TOKEN not found"
**Solución**: Verifica que agregaste el secret en GitHub

### Error: "Workflow failed"
**Solución**: Revisa los logs en la pestaña Actions

### Error: "No coverage information"
**Solución**: Normal si no tienes pruebas unitarias

---

## 🎓 PARA TU EVIDENCIA DEL SENA

Incluye:

1. ✅ Capturas de SonarCloud dashboard
2. ✅ Captura del GitHub Action ejecutándose
3. ✅ Link público a tu proyecto en SonarCloud
4. ✅ Badge en el README
5. ✅ Explicación de la integración CI/CD
6. ✅ Reporte PDF exportado de SonarCloud

Esto demuestra:
- ✅ Uso de herramientas profesionales
- ✅ Integración continua (CI/CD)
- ✅ Análisis automático de calidad
- ✅ Buenas prácticas de desarrollo

---

**Documento creado por**: Equipo MuckSena  
**Última actualización**: Noviembre 2024  
**Versión**: 1.0
