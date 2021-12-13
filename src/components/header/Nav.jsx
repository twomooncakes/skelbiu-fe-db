import css from './Nav.module.css';
import { NavLink } from 'react-router-dom';

const navData = [
    {
        id: 1,
        name: 'Home',
        to: '/'
    },
    {
        id: 2,
        name: 'Register',
        to: '/register'
    },
    {
        id: 3,
        name: 'Login',
        to: '/login'
    },
    {
        id: 4,
        name: 'My Ads',
        to: '/my-ads'
    },

]

function MainNav() {
    return (
        <nav className={css.main_nav + ' main-nav'}>
            {navData.map((link) => <NavLink key={link.id} exact to={link.to}>{link.name}</NavLink>)}
        </nav>
    );
}

export default MainNav;