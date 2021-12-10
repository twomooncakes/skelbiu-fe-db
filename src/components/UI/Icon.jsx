import css from "./Icon.module.css";

function Icon({icon, styleClass, onClick}) {
    return (
        <span className={styleClass ? `${css.icon_wrapper} ${styleClass}` : css.icon_wrapper} onClick={onClick}>
            <i className={`fa ${icon}`} aria-hidden='true' />
        </span>
    );
}

export default Icon;