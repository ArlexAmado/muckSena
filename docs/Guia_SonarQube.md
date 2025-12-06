# GUÍA DE USO - SONARQUBE PARA MUCKSENA

## 📋 ¿Qué es SonarQube?

SonarQube es una plataforma de análisis estático de código que detecta:
- 🐛 Bugs y errores
- 🔒 Vulnerabilidades de seguridad
- 💩 Code Smells (malas prácticas)
- 📊 Métricas de calidad
- 📈 Cobertura de código

---

## 🚀 CONFIGURACIÓN INICIAL

### Requisitos Previos:
1. ✅ SonarQube Server corriendo en `http://localhost:9000`
2. ✅ Sonar Scanner instalado
3. ✅ Token de autenticación generado

### Archivos Creados:
- `sonar-project.properties` - Configuración del proyecto
- `run-sonar.bat` - Script para ejecutar análisis
- `.gitignore` - Actualizado con exclusiones de SonarQube

---

## 📝 CÓMO EJECUTAR EL ANÁLISIS

### Opción 1: Usando el script (RECOMENDADO)
```cmd
run-sonar.bat
```

### Opción 2: Comando manual
```cmd
sonar-scanner.bat -D"sonar.projectKey=PruebaMuckSena" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.token=sqp_778f377f59230f2d8df0b73aa571a3da7b6c2194"
```

### Opción 3: Usando el archivo de configuración
```cmd
sonar-scanner.bat
```
(Lee automáticamente `sonar-project.properties`)

---

## 🔍 QUÉ SE ANALIZA

### Directorios incluidos:
- ✅ `frontend/js/` - JavaScript del frontend
- ✅ `js/` - Scripts principales
- ✅ `backend/` - Código del servidor
- ✅ `css/` - Estilos (para análisis de duplicación)

### Directorios excluidos:
- ❌ `node_modules/` - Dependencias
- ❌ `*.min.js` - Archivos minificados
- ❌ `dist/`, `build/` - Archivos compilados
- ❌ `coverage/` - Reportes de cobertura

---

## 📊 INTERPRETAR RESULTADOS

### 1. Acceder al Dashboard
Después del análisis, abre: **http://localhost:9000**

### 2. Métricas Principales

#### 🐛 Bugs
- **Críticos**: Deben corregirse inmediatamente
- **Mayores**: Corregir pronto
- **Menores**: Corregir cuando sea posible

#### 🔒 Vulnerabilidades
- **Críticas**: Riesgo de seguridad alto
- **Mayores**: Riesgo medio
- **Menores**: Riesgo bajo

#### 💩 Code Smells
- Código que funciona pero no sigue buenas prácticas
- Puede causar problemas de mantenimiento

#### 📈 Cobertura
- Porcentaje de código cubierto por pruebas
- Meta: > 80%

#### 🔄 Duplicación
- Código duplicado que debería refactorizarse
- Meta: < 3%

### 3. Calificación (Rating)

**A** = Excelente (0 issues)
**B** = Bueno (issues menores)
**C** = Aceptable (algunos issues)
**D** = Pobre (muchos issues)
**E** = Muy pobre (issues críticos)

---

## 🎯 OBJETIVOS DE CALIDAD PARA MUCKSENA

### Metas ISO 25000:

| Métrica | Objetivo | Actual |
|---------|----------|--------|
| **Bugs** | 0 críticos | - |
| **Vulnerabilidades** | 0 críticas | - |
| **Code Smells** | < 50 | - |
| **Cobertura** | > 80% | - |
| **Duplicación** | < 3% | - |
| **Mantenibilidad** | Rating A | - |
| **Fiabilidad** | Rating A | - |
| **Seguridad** | Rating A | - |

---

## 🔧 SOLUCIÓN DE PROBLEMAS COMUNES

### Error: "SonarQube server not found"
**Causa**: Servidor no está corriendo
**Solución**: 
```cmd
cd C:\ruta\a\sonarqube\bin\windows-x86-64
StartSonar.bat
```

### Error: "sonar-scanner is not recognized"
**Causa**: Sonar Scanner no está en PATH
**Solución**: 
1. Descarga: https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/
2. Agrega al PATH de Windows
3. Reinicia el CMD

### Error: "Unauthorized 401"
**Causa**: Token inválido o expirado
**Solución**: 
1. Ve a http://localhost:9000
2. My Account → Security → Generate Token
3. Actualiza el token en `sonar-project.properties`

### Error: "Project key already exists"
**Causa**: Proyecto ya existe con ese nombre
**Solución**: 
- Usa el proyecto existente, o
- Cambia `sonar.projectKey` en el archivo de configuración

---

## 📋 CHECKLIST ANTES DE ANALIZAR

- [ ] SonarQube Server está corriendo
- [ ] Sonar Scanner está instalado
- [ ] Token es válido
- [ ] Archivo `sonar-project.properties` está configurado
- [ ] No hay cambios sin guardar en el código

---

## 🎨 INTEGRACIÓN CON EL PLAN DE PRUEBAS

### Agregar métricas de SonarQube al Plan de Pruebas:

#### Hoja: "Métricas de Calidad SonarQube"

| Métrica | Valor | Estado | Observaciones |
|---------|-------|--------|---------------|
| Bugs Críticos | 0 | ✅ PASS | |
| Vulnerabilidades Críticas | 0 | ✅ PASS | |
| Code Smells | < 50 | | |
| Cobertura de Código | > 80% | | |
| Duplicación | < 3% | | |
| Complejidad Ciclomática | < 10 | | |
| Líneas de Código | | | |
| Deuda Técnica | < 5% | | |

#### Evidencias para el Plan de Pruebas:
1. Captura del Dashboard principal
2. Captura de la sección "Issues"
3. Captura de "Security Hotspots"
4. Captura de "Measures"
5. Reporte PDF exportado

---

## 📸 CAPTURAS RECOMENDADAS

### Para la evidencia del SENA:

1. **Dashboard General**
   - Muestra todas las métricas principales
   - Rating de calidad

2. **Issues por Severidad**
   - Lista de bugs encontrados
   - Vulnerabilidades detectadas

3. **Code Smells**
   - Principales problemas de mantenibilidad
   - Sugerencias de mejora

4. **Security**
   - Análisis de seguridad
   - Hotspots detectados

5. **Measures**
   - Métricas detalladas
   - Gráficos de evolución

---

## 🔄 ANÁLISIS CONTINUO

### Cuándo ejecutar SonarQube:

1. **Antes de cada commit importante**
2. **Después de implementar nuevas funcionalidades**
3. **Antes de entregar la evidencia**
4. **Semanalmente durante el desarrollo**

### Comando rápido:
```cmd
run-sonar.bat
```

---

## 📊 EXPORTAR RESULTADOS

### Para incluir en el Plan de Pruebas:

1. Ve a http://localhost:9000
2. Selecciona tu proyecto "PruebaMuckSena"
3. Click en "More" → "Export as PDF"
4. Guarda el PDF en `docs/SonarQube_Report.pdf`

---

## 🎯 MEJORAS SUGERIDAS

Después del primer análisis, prioriza:

### 1. Seguridad (CRÍTICO)
- Corregir todas las vulnerabilidades críticas
- Revisar security hotspots

### 2. Bugs (ALTO)
- Corregir bugs críticos y mayores
- Revisar bugs menores

### 3. Mantenibilidad (MEDIO)
- Refactorizar código duplicado
- Simplificar funciones complejas
- Mejorar nombres de variables

### 4. Cobertura (BAJO)
- Agregar pruebas unitarias
- Aumentar cobertura de código

---

## 📞 RECURSOS ADICIONALES

- **Documentación oficial**: https://docs.sonarqube.org/
- **Reglas de JavaScript**: https://rules.sonarsource.com/javascript
- **Comunidad**: https://community.sonarsource.com/

---

## ✅ CHECKLIST FINAL

Antes de entregar la evidencia:

- [ ] Análisis ejecutado sin errores
- [ ] 0 vulnerabilidades críticas
- [ ] 0 bugs críticos
- [ ] Rating de seguridad A o B
- [ ] Capturas de pantalla tomadas
- [ ] Reporte PDF exportado
- [ ] Métricas documentadas en el Plan de Pruebas
- [ ] Código refactorizado según sugerencias

---

**Documento creado por**: Equipo MuckSena  
**Última actualización**: Noviembre 2024  
**Versión**: 1.0
