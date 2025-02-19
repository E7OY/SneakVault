
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

1. **Clonar el Repositorio:**












# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
