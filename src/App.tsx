import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css'
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import RootLayout from './routes/Root';
import Home from './routes/Home';
import Register from './routes/Register';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [  //children es un array de objetos que contienen las rutas hijas de la ruta principal
            {
                index: true,  //index es un booleano que indica si la ruta es la principal
                element: <Navigate to="/home" replace />,  //Navigate es un componente que redirige a otra ruta y replace es para que no se guarde en el historial
            },
            {
                path: 'home',
                element: <Home />,
                //loader: Home.loader, //loader es una funcion que carga los datos de la ruta
            },
            {
                path: "register",
                element: <Register />,
                action: Register.action,
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />,

    },
]);


const App = () => <RouterProvider router={router} />;



export default App;
