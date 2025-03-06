//archivo para definir la estructura de navegación con CreateBrowserRouter de react-router-dom

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import RootLayout from './routes/RootLayout';
import Home from './routes/Home';
import Register from './routes/Register';
import ErrorPage from './pages/ErrorPage';
import Products from './routes/Products';
import ProductDetails from './routes/ProductDetails';

import { CartProvider } from './context/cartContext';
import { UserProvider } from './context/userContext';
import { Cart } from './routes/Cart';

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout user={''} />,
      errorElement: <ErrorPage />,
      children: [
        {    //redirige / a /home
          index: true,  //index true indica que es la ruta por defecto
          element: <Navigate to="/home" replace />,  //Navigate es un componente de react-router-dom que redirige a otra ruta
        },
        {  //ruta home
          path: 'home',
          element: <Home />,
        },
        {  //ruta cart
          path: 'cart',
          element: <Cart toggleCart={function (): void {
            throw new Error('Function not implemented.');
          }} />,
        },
        {  //ruta register
          path: 'register',
          element: <Register/>,
        },
        {  //ruta busqueda
          path: 'search',
          element: <Products products={[]} />,
        },
        {  //filtra por categorias, es una ruta dinamica que se puede cambiar por cualquier categoria que se quiera buscar en la base de datos de productos 
          path: ':categoria',
          element: <Products products={[]} />,
        },
        {  //filtrar por categoría y marca
          path: ':categoria/:marca',
          element: <Products products={[]} />,
        },
        {  //ruta de detalles de producto
          path: ':categoria/:marca/:id',
          element: <ProductDetails />
        },
      ],
    },
    {  //para otras url que no existan
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return (
    <UserProvider>
      {/*Porporciona el eastado del carrito y del user a toda la app */}
      <CartProvider>
        {/*este componente conecta la config de enrutamiento (creada en createBrowserRouter) con la interfaz de la app,
        este componente toma un objeto router con el prop router que es la configuración de enrutamiento que hemos creado
        En pocas palabras activa el enrutamiento en la app*/}
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  );
};

export default App;