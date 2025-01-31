import { NavLink } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => (
    <body>
<div id='error'>
    <p>404 <span>|</span> This page could not be found.</p>
    <NavLink to='/'>Go back to home</NavLink>
</div>
</body>
);

export default ErrorPage;