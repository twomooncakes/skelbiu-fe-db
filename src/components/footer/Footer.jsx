import css from './Footer.module.css';

function Footer() {
    return (
        <footer>
            <p className={css.copyright}>Copyright © DList 2021. All rights reserved.</p>
        </footer>
    );
}

export default Footer;