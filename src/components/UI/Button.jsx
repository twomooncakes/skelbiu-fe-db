import css from './Button.module.css';

function Button({children, mainBtn, clickFunc}) {
    return (
        <button className={`${css.btn} ${mainBtn ? css.btn_filled : css.btn_outlined}`} onClick={clickFunc}>{children}</button>
    );
}

export default Button;