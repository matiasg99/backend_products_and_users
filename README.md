# Backend Products and Users

Este proyecto es una API REST construida con Node.js y Express para la gestión de productos y usuarios. Utiliza archivos JSON como base de datos para almacenar la información.

## Instalación

1. Clona el repositorio o descarga el código fuente.
2. Instala las dependencias ejecutando:

```
npm install
```

## Uso

Para iniciar el servidor, ejecuta:

```
npm start
```

El servidor se ejecutará por defecto en `http://localhost:3000`.

## Endpoints principales

### Usuarios

- `GET    /usuarios`           → Listar todos los usuarios (requiere token y rol admin)
- `GET    /usuarios/:id`       → Obtener usuario por ID (requiere token y rol admin)
- `POST   /usuarios`           → Crear usuario (requiere token y rol admin)
- `PUT    /usuarios/:id`       → Actualizar usuario (requiere token y rol admin)
- `DELETE /usuarios/:id`       → Eliminar usuario (requiere token y rol admin)
- `PUT    /usuarios/:id/rol`   → Cambiar rol de usuario (requiere token y rol admin)

### Productos

- `GET    /productos`          → Listar todos los productos (requiere token)
- `GET    /productos/:id`      → Obtener producto por ID (requiere token)
- `POST   /productos`          → Crear producto (requiere token y rol admin)
- `PUT    /productos/:id`      → Actualizar producto (requiere token y rol admin)
- `DELETE /productos/:id`      → Eliminar producto (requiere token y rol admin)

### Autenticación
- `POST /auth/register`        → Registrar un nuevo usuario
- `POST /auth/login`           → Iniciar sesión y obtener token
Ejemplo de uso:

```bash
curl -sX POST http://localhost:3000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@test.com","password":"123456"}' | jq -r .token
```

## Requisitos
- Node.js >= 14
- npm

