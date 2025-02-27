//archivo para definir la estructura de navegación con CreateBrowserRouter de react-router-dom

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import RootLayout from './routes/Root';
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
          index: true,
          element: <Navigate to="/home" replace />,
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
        {  //filtra por categorias 
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
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  );
};

export default App;