# Lab2 - MyBookStore AWS Architecture

## Descripción General

Esta solución implementa una arquitectura completa en AWS para una aplicación web de librería con backend en Node.js/Express y frontend en React, utilizando CloudFormation para Infrastructure as Code (IaC).

## S3 + Back

### Arquitectura

![Arquitectura AWS - Lab2-s3](https://github.com/user-attachments/assets/de07589e-a708-4eb1-aedd-f9ad4a3c7d28)

### Build y Deploy del Frontend

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install

# Configurar variable de entorno para API
export VITE_API_BASE_URL=http://[ALB-DNS-NAME]

# Build del proyecto
npm run build

# Subir archivos de la carpeta 'dist' al bucket S3
```

### ¿Por qué Deploy Manual del Frontend?

   - CloudFormation gestiona infraestructura, no código de aplicación
   - El build del frontend requiere Node.js, dependencias y proceso de compilación
   - Build del frontend necesita conocer URL del ALB (circular dependency)
   - Stack podría completarse exitosamente con frontend roto
   - Rollback complicado si hay problemas de código vs infraestructura

### Alternativas Avanzadas

1. **AWS CodePipeline + CodeBuild**
   - Pipeline automático git → build → S3
   - Separado del stack de infraestructura

2. **CDK (Cloud Development Kit)**

3. **Terraform con provisioners**
   - Mayor flexibilidad para comandos post-deploy
   - Mejor manejo de dependencias locales

> [!NOTE]
> Por mantener la simplicidad de este ejercicio y explorar las funciones de CloudFormation no se aplicó ninguna de estas alternativas

### URLs de Acceso

Después del despliegue:

- **Frontend**: `http://[BUCKET-NAME].s3-website-us-east-1.amazonaws.com`
- **Backend API**: `http://[ALB-DNS-NAME]/api/books`
