import { useState } from "react";
import Icon from "../UI/Icon";
import css from "./Ad.module.css";

function Ad({ad, price}) {
    const [favorited, setFavorited] = useState(false);
    let itemPrice = price || 30;
    const isFree = parseInt(itemPrice) === 0;
    return (
        <div className={css["ad-card"]}>
            <img className={css["product-image"]} src="https://media.karousell.com/media/photos/products/2018/12/05/ps3_slim_used_1543973790_3c16f9d1.jpg" alt="" />
            <div className={css["product-info"]}>
                <h2 className={css["product-title"]}>Used PS3</h2>
                <p><Icon icon="fa-clock-o" /> 3 years ago</p>
                <p><Icon icon="fa-map-marker" /> Kaunas</p>
                <p><Icon icon="fa-tag" /> Other</p>
                <p><Icon icon="fa-eye" /> 41 views</p>
                <div className={css["product-footer"]}>
                    <p className={`${css["product-price"]} ${isFree ? css["free-item"] : ''}`}>{isFree ? 'Free' : itemPrice + ' €'}</p>
                    <Icon icon={favorited ? "fa-heart" : "fa-heart-o"} onClick={() => setFavorited(!favorited)}/>
                </div>
            </div>
        </div>
    );
}

export default Ad;
