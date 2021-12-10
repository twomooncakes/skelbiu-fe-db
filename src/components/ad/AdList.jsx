import Ad from "./Ad";
import css from "./AdList.module.css";

function AdList() {
    return (
        <section className={css.list}>
            <Ad />
            <Ad />
            <Ad />
            <Ad price='0'/>
        </section>
    );
}

export default AdList;