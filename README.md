# E-commerce API

API RESTful para una plataforma de comercio electrónico, construida con Clean Architecture.

## Tecnologías

- **Node.js** & **TypeScript**
- **Express**
- **Prisma** (ORM)
- **PostgreSQL**
- **Jest** (Testing)
- **Docker** & **Docker Compose**

## Requisitos Previos

- Node.js (v20+)
- Docker & Docker Compose

## Configuración Local

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repo>
   cd proyecto1
   ```

2. **Variables de Entorno**
   Crea un archivo `.env` en la raíz (puedes copiar el ejemplo si existe o usar la configuración de docker-compose):
   ```env
   DATABASE_URL="postgresql://admin:password123@localhost:5432/ecommerce_portfolio?schema=public"
   ```

3. **Levantar Base de Datos**
   ```bash
   docker-compose up -d
   ```

4. **Instalar Dependencias**
   ```bash
   npm install
   ```

5. **Migraciones de Base de Datos**
   ```bash
   npx prisma migrate dev
   ```

6. **Iniciar Servidor (Desarrollo)**
   ```bash
   npm run dev
   ```

## Testing

Para ejecutar las pruebas unitarias y de integración:

```bash
npm test
```

## Despliegue (Deployment)

Este proyecto incluye configuración para despliegue con **Docker**.

### Docker

Construir la imagen:
```bash
docker build -t ecommerce-api .
```

### CI/CD

El proyecto cuenta con un flujo de trabajo de **GitHub Actions** que ejecuta los tests automáticamente en cada push a la rama `master`.

Para desplegar en un VPS usando **Coolify**:
1. Conecta tu repositorio de GitHub a Coolify.
2. Coolify detectará automáticamente el `Dockerfile`.
3. Configura las variables de entorno en el panel de Coolify.
4. ¡Listo! Coolify desplegará la aplicación automáticamente.
