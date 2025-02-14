// filepath: /C:/Users/soyel/Desktop/2ºDAW/2ºEVAL/DAWC/SneakVault/src/App.tsx
import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import RootLayout from './routes/Root';
import Home from './routes/Home';
import Register from './routes/Register';
import ErrorPage from './pages/ErrorPage';
import Products from './routes/Products';
import ProductDetails from './routes/ProductDetails';


import { db } from './utils/firebase.utils';
import { DataSnapshot, onValue, ref } from 'firebase/database';


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
          path: 'zapatillas',
          element: <Products products={[]} />,
        },
        {
          path: 'zapatillas/:marca',
          element: <Products products={[]} />,
        },
        {
          path: 'camisetas',
          element: <Products products={[]} />,
        },
        {
          path: 'camisetas/:marca',
          element: <Products products={[]} />,
        },
        /*detalle producto*/
        {
          path: ':categoria',
          children: [
            {
              index: true,
              element: <Products products={[]} />,
            },
            { 
              path: ':marca/:nombre',
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
      <RouterProvider router={router} />
    </>
  );
};

export default App;