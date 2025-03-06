
![Group 71](https://github.com/user-attachments/assets/21a5697a-bf87-4496-9797-3f17fff6aa01)


# SneakVault - E-commerce de Zapatillas y Camisetas

Este proyecto consiste en una aplicación web de venta de zapatillas y camisetas, desarrollada con React para el frontend Y Firebase para la base de datos y la parte de autenticación. El objetivo principal es ofrecer una plataforma intuitiva y atractiva para la compra de productos relacionados con el calzado y la vestimenta urbana.

## Funcionalidades Principales

- **Página Principal:** Muestra una descripción de SneakVault, productos destacados y información de contacto.
- **Página de Productos:** Permite visualizar todos los productos, con opciones de paginación, búsqueda y filtros por categoría y rango de precios.
- **Página de Detalle de Producto:** Muestra información detallada de cada producto y permite agregarlo al carrito (para usuarios logueados) o iniciar sesión (para usuarios no logueados).
- **Página de Carrito:** Permite visualizar los productos seleccionados, modificar cantidades, eliminar productos y calcular el precio total.
- **Página de Login:** Formulario para iniciar sesión en la aplicación.
- **Página de Registro:** Formulario para registrar nuevos usuarios, con validaciones y mensajes de error.

## Tecnologías Utilizadas

- **Frontend:** React, CSS y Bootstrap
- **Base de Datos:** Google Firebase
- **Otras:** React Router

## Instalación y Configuración


1.  **Clonar el Repositorio:**

    Clona el repositorio de GitHub en tu máquina local usando el siguiente comando:

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd SneakVault
    ```

2.  **Instalar Dependencias:**

    Asegúrate de tener Node.js y npm (o yarn) instalados en tu sistema. Luego, instala las dependencias del proyecto:

    ```bash
    npm install
    ```

    en caso de usar yarn:

    ```bash
    yarn install
    ```

3.  **Configuración de Firebase:**

    Para conectar la aplicación con Firebase, sigue estos pasos:

    *   **Crear un Proyecto en Firebase:**
        *   Ve a la [Consola de Firebase](https://console.firebase.google.com/).
        *   Haz clic en "Añadir proyecto" y sigue las instrucciones para crear un nuevo proyecto.
    *   **Configurar la Autenticación:**
        *   En la sección "Autenticación", habilita el método de inicio de sesión por correo electrónico/contraseña y Google.
    *   **Crear una Base de Datos:**
        *   En la sección "Realtime Database", crea una nueva base de datos e importa el archivo bg.json que se encuentra en la raiz del proyecto.
    *   **Obtener las Credenciales:**
        *   Ve a la configuración del proyecto (icono de engranaje) y selecciona "Configuración del proyecto".
        *   En la sección "Tus aplicaciones", selecciona "Web" para obtener el código de inicialización de Firebase.

4.  **Configurar las Variables de Entorno:**

    Crea un archivo `firebase.utils.tsx` en la raíz del proyecto y añade las credenciales de Firebase que obtuviste en el paso anterior.

5.  **Ejecutar la Aplicación:**

    Una vez que hayas añadido el archivo de configuracion de firebase, puedes ejecutar la aplicación en modo de desarrollo con el siguiente comando:

    ```bash
    npm run dev
    ```

    o si usas yarn:

    ```bash
    yarn dev
    ```

    Esto iniciará el servidor de desarrollo y abrirá la aplicación en tu navegador.

## Dependencias Adicionales

*   **Bootstrap:** Framework CSS para estilos y diseño responsive.
*   **React Router:** Librería para la gestión de rutas en la aplicación.
*   **Firebase:** Plataforma de desarrollo de aplicaciones con servicios de autenticación y base de datos.
*   **Framer Motion:** Librería para crear animaciones y transiciones en React.

![FireShot Capture 050 - SneakVault - localhost](https://github.com/user-attachments/assets/edf41732-55fe-456d-b252-bd9511f3af8f)

![FireShot Capture 051 - SneakVault - localhost](https://github.com/user-attachments/assets/27ae6f2e-ad19-469d-b319-b8b175c80c1d)
