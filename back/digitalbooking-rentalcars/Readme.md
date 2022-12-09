# G11 - Booking Rentalcars API V4.0

## Functions / Funciones 🛠️

***The API project developed by Group 11 allows, among its main functions:***

1. User login and registration through Spring Security and JWT.
2. CRUD of products.
3. CRUD of categories.
4. CRUD of reserves.
5. CRUD of cities.
6. CRUD of features.
7. CRUD of images.
8. CRUD of users.
9. CRUD of roles.
10. JWT token expiration time (100 minutes).
11. Security restrictions applied in "SecurityConfig" class.
12. Automatic service deployment on AWS EC2 via CI/CD via GitLab.

- **2022-10-28 [ADD]:**

  1. API structure creation.
  2. Search for products by the parameters "cities" and "categories".
  3. CRUD of Categories (Using Spring Data JPA, it allows us to connect to the database to perform different operations, such as: add a new category, list all categories, edit a particular category or delete a category).

- **2022-11-4 [UPDATE]:**
  1. File System 2.0: AWS Cloud Database Storage Service. (The MySQL database storage we had on a particular remote server has been removed.)

- **2022-11-8 [ADD]:**
  1. Added relationship between City and Product -> where a product belongs to a city (using Hibernate).
  2. List of products according to Category (Allows that when selecting a category, they are obtained from the database and show the products of that category).
  3. CRUD of Products (Using Spring Data JPA, it allows actions to create, list, search, modify and delete by ID to the product controller).
  4. Added relationship between Category and Product -> where a product belongs to a category (using Hibernate).
  5. Added relationship between Product and Feature -> where a product can have several features and a feature can be included in several products (via Hibernate).
  6. A city filter is implemented in the product controller to allow listing products by city.

- **2022-11-10 [ADD]:**
  1. List of random products (Allows when the user is not identified, to see a random list of products).
  2. CRUD of Cities (Using Spring Data JPA, it allows actions to create, list, search, modify and delete by ID to the city controller).

- **2022-11-21 [ADD]**

  1. CRUD of Users (Using Spring Data JPA, it allows actions to create, list, search, modify and delete by ID to the user controller).
  2. The Spring Security authentication method is added to the endpoint of users that returns a JWT (Spring Security is configured together with the io.jsonwebtoken library to implement authentication using JWT. Likewise, once logged in, it returns the JWT encoding the "username" and the "password", which can be easily validated/decoded by pasting said token in the "Encoded" field of the web https://jwt.io).
  3. Filter by city and date range is implemented.
  4. CRUD of Roles (Using Spring Data JPA, it allows actions to create, list, search, modify and delete by ID to the role controller).
  5. CRUD of Reservations (Using Spring Data JPA, it allows actions to create, list, search, modify and delete by ID to the reservation controller).

- **2022-12-6 [ADD]**:

  1. Added token security to the reservation creation endpoint (Only requests with a valid token will be able to create new reservations).
  2. An endpoint is created that allows filtering reservations by user ID.
  3. Access to endpoints by roles (Only requests with a valid token will be able to access the different endpoints).
  4. Automatic service deployment on AWS EC2 via CI/CD via GitLab.




=======================================
  
  ***El proyecto API desarrollado por el Grupo 11 permite, entre sus funciones principales:***

  1. Login y registro de usuarios a través de Spring Security y JWT.
  2. CRUD de productos.
  3. CRUD de categorías.
  4. CRUD de reservas.
  5. CRUD de ciudades.
  6. CRUD de características.
  7. CRUD de imágenes.
  8. CRUD de usuarios.
  9. CRUD de roles.
  10. Tiempo de caducidad del token JWT (100 minutos).
  11. Restricciones de seguridad aplicadas en clase "SecurityConfig".
  12. Despliegue automático del servicio en EC2 de AWS por medio de CI/CD a través de GitLab.

- **2022-10-28 [ADD]:** 

  1. Creación estructura API.
  2. Búsqueda de productos por los parámetros "ciudades" y "categorías". 
  3. CRUD de Categorías (Utilizando Spring Data JPA, permite conectarnos a la base de datos para realizar distintas operaciones, como ser: agregar una categoría nueva, listar todas las categorías, editar una categoría en particular o eliminar una categoría).

- **2022-11-4 [UPDATE]:**
  1. Sistema de archivos 2.0: Servicio de almacenamiento de base de datos en la nube de AWS. (Se ha eliminado el almacenamiento en bases de datos MySQL que teníamos en un servidor remoto particular).

- **2022-11-8 [ADD]:**
  1. Se agrega relación entre Ciudad y Producto -> donde un producto pertenece a una ciudad (mediante Hibernate).
  2. Listado de productos según Categoría (Permite que al seleccionar una categoría, se obtengan de la base de datos y muestren los productos de esa categoría).
  3. CRUD de Productos (Utilizando Spring Data JPA, permite acciones de crear, listar, buscar, modificar y eliminar por ID al controlador de productos).
  4. Se agrega relación entre Categoría y Producto -> donde un producto pertenece a una categoría (mediante Hibernate).
  5. Se agrega relación entre Producto y Característica -> donde un producto puede tener varias características y una característica puede ser incluida en varios productos (mediante Hibernate).
  6. Se implementa filtro de ciudad en controlador de productos para permitir listar productos según ciudad.

- **2022-11-10 [ADD]:**
  1. Listado de productos aleatorios (Permite que cuando el usuario no esté identificado, vea una lista aleatoria de productos).
  2. CRUD de Ciudades (Utilizando Spring Data JPA, permite acciones de crear, listar, buscar, modificar y eliminar por ID al controlador de ciudades).

- **2022-11-21 [ADD]**

  1. CRUD de Usuarios (Utilizando Spring Data JPA, permite acciones de crear, listar, buscar, modificar y eliminar por ID al controlador de usuarios).
  2. Se agrega método de autenticación con Spring Security a endpoint de usuarios que nos retorne un JWT (Se configura Spring Security junto con la librería io.jsonwebtoken para implementar la autenticación mediante JWT. Asimismo, una vez logueado, devuelve el JWT codificando el "username" y el "password", lo cual puede ser fácilmente validado/decodificado pegando dicho token en el campo "Encoded" de la web https://jwt.io).
  3. Se implementa filtro por ciudad e intervalo de fechas.
  4. CRUD de Roles (Utilizando Spring Data JPA, permite acciones de crear, listar, buscar, modificar y eliminar por ID al controlador de roles).
  5. CRUD de Reservas (Utilizando Spring Data JPA, permite acciones de crear, listar, buscar, modificar y eliminar por ID al controlador de reservas).

- **2022-12-6 [ADD]**:

  1. Se agrega seguridad con token al endpoint de creación de reservas (Solo las peticiones con un token válido podrán crear nuevas reservas).
  2. Se crea endpoint que permite filtrar reservas por ID de usuario.
  3. Acceso a endpoints por roles (Solo las peticiones con un token válido podrán tener acceso a los distintos endpoints).
  4. Despliegue automático del servicio en EC2 de AWS por medio de CI/CD a través de GitLab.

## Documentation / Documentación API SWAGGER

Once the API is up, go to the following link:

http://localhost:8080/swagger-ui/index.html#/

=======================================

Una vez levantada la API, dirigirse al siguiente link:

http://localhost:8080/swagger-ui/index.html#/


## ToDo / Por hacer 📔

* Simply for the purpose of providing greater robustness to the project:
  - Product use policies.
  - Among others.

    =======================================

* Simplemente a los efectos de aportar mayor robustez al proyecto:
  - Políticas de uso del producto.
  - Entre otros.

# Authors / Autores ✒️

- [Sabrina Incinga](https://www.linkedin.com/in/sabrina-incinga-software-developer/)
- [Adriana Fernández](www.linkedin.com/in/adriana-denise-fernandez)
- [Federico Martin](https://www.linkedin.com/in/federicohmartin)
- [Jacobo Gaitán](https://www.linkedin.com/in/juan-jacobo-gaitan-sanchez-709188a5)
- [Fernando Escobar](https://www.linkedin.com/in/fereco)