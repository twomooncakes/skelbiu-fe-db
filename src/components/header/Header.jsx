import css from './Header.module.css';
import MainNav from './Nav';

function Header() {
    return (
        <header>
            <div className={css.header_wrapper}>
                <div className={css.logo}>
                    <img src="images/logo.png" alt=""/>
                    <h1>DList</h1>
                </div>
                <div className={css.controls}>
                    <MainNav />
                </div>
            </div>
        </header>
    );
}

export default Header;