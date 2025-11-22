Este proyecto forma parte de la entrega final del curso de Backend en Talento Tech.
La aplicación consiste en una API REST que permite crear, leer, actualizar y eliminar productos almacenados en Firebase.
También incluye autenticación con JWT y middleware propios.

🚀 Tecnologías utilizadas

- Node.js
- Express
- Firebase / Firestore
- JSON Web Tokens (JWT)
- CORS
- Vercel (deploy)

📌 Funcionalidades principales

- Login y generación de token JWT
- CRUD completo de productos
- Middleware global para:
 * Validar token
 * Manejar rutas inexistentes (404)
 * Loguear cada request
 * Validación de body vacío
 * Respuestas claras y estructuradas según cada caso

🔐 Autenticación

Todos los endpoints de productos requieren enviar un token válido:

```
Authorization: Bearer <token>
```

El token se obtiene haciendo un **POST** al endpoint de login.
**/login**

En este caso las credenciales de usuario estan hardcodeadas:
```
email: "test@gmail.com" 
password :"123456"
```

🛠️ Scripts disponibles
```
npm install   // instala dependencias
npm start     // servidor en producción
```
🔧 Configuración de variables de entorno

Para deployar en Vercel, es necesario agregar las credenciales de Firebase en:

Project → Settings → Environment Variables

Variables utilizadas:
```
VITE_APIKEY
VITE_AUTHDOMAIN
VITE_PROJECTID
VITE_STORAGEBUCKET
VITE_MESSAGINGSENDERID
VITE_APPID
```

Estas reemplazan los valores del archivo config.js.

📦 Endpoints principales
##### GET /api/products
Obtiene todos los productos.

##### GET /api/products/:id
Devuelve un producto por ID.

##### POST /api/products/create
Crea un nuevo producto.

##### PUT /api/products/:id
Actualiza un producto existente.

##### DELETE /api/products/:id
Elimina un producto por su ID.


### ✔ Estado del proyecto
Todas las funcionalidades fueron testeadas con Postman:

- Token válido / inválido / ausente

- CRUD completo

- Manejo de errores

- Validación de body vacío

- IDs inexistentes


🧑‍💻 Autor

Cisnero Raul Eduardo

Proyecto desarrollado como parte de la formación en Backend – Talento Tech.

