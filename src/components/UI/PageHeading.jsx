import Button from "./Button";
import css from "./PageHeading.module.css";
import { Link } from "react-router-dom";

function PageHeading({title, btns}) {
    return (
        <section className={css.heading}>
            <h1>{title}</h1>
            <div className={css.btns}>
                {btns.map((btn,index) => {
                    if(btn.url) {
                        return (
                            <Link key={index} to={btn.url}><Button mainBtn={btn.mainBtn}>{btn.text}</Button></Link>
                        )
                    } else {
                        return (
                            <Button key={index} mainBtn={btn.mainBtn}>{btn.text}</Button>
                        )
                    }
                })}
            </div>
        </section>
    ); 
}

export default PageHeading;