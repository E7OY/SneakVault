import { NavLink } from 'react-router-dom';
import './NotFoundPage.css';
import error from '../../assets/404.webp';
import 'bootstrap/dist/css/bootstrap.min.css';


const NotFoundPage = () => (
    <body id='body-nfp' className=' '>
        <div id='error' className=' '>
            <h1 className='display-4'>404. This page could not be found. </h1>
            <NavLink to='/'> Go back to home</NavLink>
        </div>
            <img src={error} className='' alt="imagen error 404" />
    </body>
);

export default NotFoundPage;