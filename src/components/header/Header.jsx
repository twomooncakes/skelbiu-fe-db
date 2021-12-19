import css from './Header.module.css';
import MainNav from './Nav';

function Header() {
    return (
        <header>
            <div className={css.header_wrapper}>
                <h1 className={css.brand}>ListingHub</h1>
                <div className={css.controls}>
                    <MainNav />
                </div>
            </div>
        </header>
    );
}

export default Header;