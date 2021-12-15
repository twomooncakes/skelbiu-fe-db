import css from './Nav.module.css';
import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthContext';
import Button from '../UI/Button';
import Icon from '../UI/Icon';


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
    }
]

const authedNav = [
    {
        id: 1,
        name: 'Home',
        to: '/'
    },
    {
        id: 2,
        name: 'My Ads',
        to: '/my-ads'
    }
]

function MainNav() {
    const { isLoggedIn, logout } = useAuthCtx();
    let navArr = isLoggedIn ? authedNav : navData;
    return (
        <nav className={css.main_nav + ' main-nav'}>
            {navArr.map((link) => <NavLink key={link.id} exact to={link.to}>{link.name}</NavLink>)}
            {isLoggedIn && <NavLink to='/login' onClick={logout}>Logout</NavLink>}
            {isLoggedIn && <NavLink to='/create-listing'>
                <Button mainBtn={true} ><Icon icon='fa-plus'/> New Ad</Button>
            </NavLink>}
        </nav>
    );
}

export default MainNav;