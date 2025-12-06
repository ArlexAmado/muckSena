# PLAN DE VALIDACIÓN DE CARACTERÍSTICAS MÍNIMAS DE HARDWARE

## PORTADA

Programa de Formación: Análisis y Desarrollo de Software  
Proyecto Formativo: Construcción de software integrador de tecnologías orientadas a servicios  
Fase del Proyecto: Ejecución  
Resultado de Aprendizaje: 220501097-01  
Actividad de Aprendizaje: GA10-220501097-AA2  
Evidencia: GA10-220501097-AA2-EV01  

Proyecto: MuckSena - Plataforma de Gestión de Cursos  
Autor: Arlex Amado  
Fecha: Noviembre 2025  

---

## INTRODUCCIÓN

El presente documento establece el plan de validación de características mínimas de hardware necesarias para el despliegue exitoso de la aplicación web MuckSena, una plataforma de gestión de cursos en línea desarrollada con tecnologías modernas.

MuckSena es una aplicación web construida con las siguientes características técnicas:

- Backend: Node.js con Express.js
- Base de datos: MongoDB Atlas (servicio en la nube)
- Autenticación: JWT y OAuth 2.0 con Google
- Usuarios proyectados: 250 usuarios activos no concurrentes
- Tipo de aplicación: Web application con arquitectura cliente-servidor

Este plan de validación tiene como objetivo verificar que el entorno de despliegue cumple con los requisitos mínimos de hardware, sistema operativo, licenciamiento y configuración de base de datos para garantizar el funcionamiento óptimo de la aplicación.

---

## JUSTIFICACIÓN DE LOS ÍTEMS SELECCIONADOS

La selección de los elementos incluidos en este plan de validación se fundamenta en los siguientes criterios:

### 1. Requisitos del Sistema Operativo
Es fundamental verificar la compatibilidad del sistema operativo con Node.js y las dependencias del proyecto. Node.js tiene requisitos específicos según la versión y el sistema operativo, lo que impacta directamente en la capacidad de ejecutar la aplicación.

### 2. Especificaciones de Hardware
Con una proyección de 250 usuarios activos no concurrentes, es necesario dimensionar correctamente los recursos de CPU, RAM y almacenamiento para evitar cuellos de botella en el rendimiento. Estos valores se basan en las recomendaciones oficiales de Node.js y MongoDB para aplicaciones de producción.

### 3. Licenciamiento de Software
La verificación del tipo de licencia es crucial para garantizar el cumplimiento legal y la sostenibilidad del proyecto. Se debe validar que todas las tecnologías utilizadas sean compatibles con el uso previsto (educativo/comercial).

### 4. Requisitos de Base de Datos
MongoDB Atlas es un servicio en la nube que requiere conectividad de red estable y configuraciones específicas. Es necesario verificar que el servidor tenga acceso a internet y cumpla con los requisitos de seguridad para la conexión con servicios externos.

### 5. Requisitos de Red y Seguridad
Para una aplicación web con autenticación OAuth 2.0 y servicios externos (Google OAuth, MongoDB Atlas, Nodemailer), es esencial validar la conectividad, puertos abiertos y certificados SSL/TLS.

---
