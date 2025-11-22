# API de Autenticación, Gestión de Usuarios, Autores y Libros

API backend construida con **Node.js**, **Express**, **Prisma**, **Passport (Local + JWT)** y una arquitectura modular. Utiliza **PostgreSQL** como base de datos, administrada mediante **Docker Compose** y **pgAdmin**.

Incluye autenticación completa, manejo de roles (Admin, Empleado, Usuario), recuperación de contraseñas por correo y CRUD de usuarios, autores y libros.

---

## 🚀 Tecnologías principales

- **Node.js**
- **Express**
- **Prisma ORM**
- **Passport.js** (Local + JWT)
- **PostgreSQL** (Docker Compose)
- **pgAdmin** (Docker Compose)
- **bcrypt** — Hashing seguro de contraseñas
- **boom** — Manejo de errores HTTP
- **nodemailer** — Correo Fake para cambio de contraseña
- **dotenv** — Variables de entorno

---

## 📦 Requisitos previos

Debes tener instalado:

- Node.js 18+
- Docker & Docker Compose
- Git

---

## ⚙️ Configuración del entorno

### 1. Clonar el repositorio

```bash
git clone <URL-de-tu-repositorio>
cd <nombre-del-proyecto>
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `.env`

Crea un archivo `.env` en la raíz copiando este contenido (del `.env.example`):

```
DATABASE_URL="postgresql://user:password@host:5432/db_name?schema=public"
POSTGRES_USER=
POSTGRES_PASSWORD=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
PORT=
JWT_SECRET=
JWT_SECRET_RECOVERY=
EMAIL_RECOVERY=
PASSWORD_EMAIL_RECOVERY=
```

> El puerto del servidor **no debe fijarse en el README**, porque es configurable por quien clone el proyecto.

---

## 🐳 Servicios con Docker Compose

Archivo: `docker-compose.yml`

Levanta PostgreSQL y pgAdmin:

```bash
docker-compose up -d
```

Servicios disponibles:

| Servicio   | Puerto | Descripción                    |
|-----------|--------|--------------------------------|
| Postgres  | 5432   | Base de datos principal        |
| pgAdmin   | 5050   | Panel de administración Web    |

Acceso a pgAdmin:

```
Email: (valor en .env)
Password: (valor en .env)
```

Para registrar el server en pgadmin debes usar como host el nombre del contenedor de nuestra BD en este caso "postgres".
---

## 🔧 Prisma ORM

### Generar cliente:
```bash
npx prisma generate
```

### Migrar base de datos:
```bash
npx prisma migrate dev
```

### Panel visual: (opcional si ya usas pgadmin)
```bash
npx prisma studio
```

---

## 🔐 Autenticación

El proyecto implementa dos estrategias:

### ✔️ Passport Local
- Login mediante email + contraseña
- Passwords cifradas con bcrypt


### ✔️ Passport JWT
- Generación de token JWT tras login
- Protección de rutas privadas
- Renovación mediante lógica custom de roles

Roles implementados:

- **Admin** — Gestiona usuarios y CRUD total (rolId: 1)
- **Usuario** — Acceso a endpoints básicos autenticados (rolId: 2)
- **Empleado** — Gestiona autores y libros (rolId: 3)

---

## 📚 Endpoints principales

### **ADMIN**
- `GET /users` — Listar usuarios
- `POST /create-employee` — Crear empleados
- `DELETE /users` — Eliminar usuarios

### **AUTH**
- `POST /registro` — Registro
- `POST /login` — Login
- `POST /recovery` — Enviar correo de recuperación
- `POST /change-password` — Cambiar contraseña

### **/AUTORES**
- `GET /`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

### **LIBROS**
- `GET /`
- `GET /:id`
- `GET /buscar?titulo=...`
- `POST /`
- `PUT /`
- `DELETE /`

> **Todas las rutas** requieren autenticación JWT.  
> Rutas admin → requieren rol admin.  
> Rutas diferentes de **GET** de autores/libros → requieren rol empleado o admin.

---

## ▶️ Ejecutar el servidor

```bash
npm run dev
```

El servidor correrá en el puerto configurado en `.env` (por ejemplo 8585).

---

## 🗂️ Estructura del proyecto

```
├── prisma
│   └── schema.prisma
├── src
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── routes
│   ├── services
│   ├── strategies
│   └── server.js
├── docker-compose.yml
├── .env.example
├── prisma.config.js
├── package.json
└── README.md
```

---

## 🧪 Colección Postman

Este repositorio incluye una **Postman Collection** con todos los endpoints de la API, lista para importar y probar en localhost, lo puedes encontrar con el nombre:

📄**Library-Alpa_BPO-api-auth.postman_collection.json**

---

## 📝 Licencia

Este proyecto utiliza la licencia **MIT**, adecuada para proyectos open‑source y comerciales.  
Permite uso, modificación y distribución sin restricciones.

---

## 📩 Autor

**Diego (Dfer07)** — Desarrollador Full Stack  & Ingeniero de Materiales.

