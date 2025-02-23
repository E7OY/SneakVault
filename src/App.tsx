import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import RootLayout from './routes/Root';
import Home from './routes/Home';
import Register from './routes/Register';
import ErrorPage from './pages/ErrorPage';
import Products from './routes/Products';
import ProductDetails from './routes/ProductDetails';

import {CartProvider} from './context/cartContext';

const App = () => {
  const [user, setUser] = useState<{ displayName?: string; email: string } | null>(null);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout user={user} />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Navigate to="/home" replace />,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'register',
          element: <Register setUser={setUser} />,
        },
        {
          path: ':categoria',
          element: <Products products={[]} />,
        },
        {
          path: ':categoria/:marca',
          element: <Products products={[]} />,
        },
        {
          path: ':categoria',
          children: [
            {
              index: true,
              element: <Products products={[]} />,
            },
            { 
              path: ':marca/:id',
              element: <ProductDetails />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return (
    <>
    <CartProvider>
      <RouterProvider router={router} />
      </CartProvider>
    </>
  );
};

export default App;