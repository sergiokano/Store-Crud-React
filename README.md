# Store CRUD React App

Para iniciar la aplicación los pasos son los siguientes:

1. Clonar el proyecto
   ```sh
   git clone https://github.com/sergiokano/Store-Crud-React
   ```
2. Instalar los paquetes npm
   ```sh
   npm i
   ```
3. Iniciar la app

   ```sh
    npm start
   ```

## Acerca de la App

La aplicación utiliza [fakestoreapi](https://fakestoreapi.com/) para simular operaciones CRUD (Crear, Leer, Actualizar, Borrar) en productos.

### Funcionalidades

- **Añadir Productos**: Puedes añadir nuevos productos a la lista.
- **Editar Productos**: Modifica los detalles de un producto existente.
- **Borrar Productos**: Elimina productos de la lista.

### Nota Importante

Aunque la respuesta de la API se trata y refleja cambios en la interfaz, al recargar la página web, se realiza una nueva petición a `fakestoreapi`. Esto resulta en que todos los datos se restablezcan a su estado inicial, ya que no es posible modificar la base de datos real de `fakestoreapi`.

Con las respuestas de crear, modificar y borrar, se procesan y se ajusta el estado actual de los productos como si se estuvieran modificando en una base de datos real.

## Vista Previa

![Vista de la App](https://github.com/sergiokano/Store-Crud-React/assets/113986570/42581f29-8364-4f3f-935e-7c6fb95e4c89)
