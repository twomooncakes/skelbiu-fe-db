import css from './Nav.module.css';
import { NavLink } from 'react-router-dom';

function MainNav() {
    return (
        <nav className={css.main_nav}>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/register'>Register</NavLink>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/my-ads'>My Ads</NavLink>
        </nav>
    );
}

export default MainNav;