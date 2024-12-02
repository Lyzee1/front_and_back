Este proyecto es una aplicación web para gestionar superhéroes, donde los usuarios pueden registrarse, iniciar sesión y realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre un catálogo de superhéroes.

## Tecnologías utilizadas

### Frontend
- **React**
- **TypeScript**
- **React Router**
- **CSS**
### Backend
- **Node.js**
- **Express**
- **MySQL**
- **bcrypt**
- **express-session**
- **CORS**

## Estructura del proyecto

### Frontend
- **`App.tsx`**: Maneja el registro e inicio de sesión del usuario.
- **`sesion.tsx`**: Componente principal donde los usuarios pueden ver y administrar la lista de superhéroes.

### Backend
- **`app.js`**: Configura el servidor Express, el manejo de sesiones y el enrutamiento.
- **Rutas**:
  - **`routes/superheroes.js`**: Rutas para manejar las operaciones CRUD sobre los superhéroes.
  - **`routes/routesUs/usersRoutes.js`**: Rutas para el registro, inicio de sesión y cierre de sesión de usuarios.

## Funcionalidades principales

### Autenticación
1. **Registro de usuarios**:
   - Endpoint: `/users/register`
2. **Inicio de sesión**:
   - Endpoint: `/users/login`
3. **Cierre de sesión**:
   - Endpoint: `/users/logout`

### Gestión de superhéroes
1. **Listar todos los superhéroes**:
   - Endpoint: `/superheroes/`
2. **Crear un nuevo superhéroe**:
   - Endpoint: `/superheroes/save`
3. **Actualizar un superhéroe**:
   - Endpoint: `/superheroes/:id`
4. **Eliminar un superhéroe**:
   - Endpoint: `/superheroes/:id`

## Configuración del entorno

### Base de datos
1. Cree una base de datos llamada `marvel` en MySQL.
2. Cree las siguientes tablas:

```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE superheroes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  alias VARCHAR(255) NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255),
  edad INT,
  ciudad VARCHAR(255),
  poderes TEXT
);
