import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import RootLayout from './routes/Root';
import Home from './routes/Home';
import Register from './routes/Register';
import ErrorPage from './pages/ErrorPage';
import Productos from './routes/Products';
import ProductList from './routes/Products';
import Products from './routes/Products';

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
          path: 'products',
          element: <Products/>,
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