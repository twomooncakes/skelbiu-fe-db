import { useState, useEffect } from "react";
import Icon from "../UI/Icon";
import css from "./Ad.module.css";
import TimeAgo from 'timeago-react';
import { backURL } from "../../utils/fetch";

function Ad({ad, email}) {
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        if(ad.likedBy) {
            setFavorited(ad.likedBy.split(',').includes(email));
        }
        return () => {
            setFavorited(false);
        }
    }, [])
    
    const isFree = parseInt(ad.price) === 0;
    
    return (
        <div className={css["ad-card"]}>
            <div className={css["product-image-wrapper"]}>
                <img className={css["product-image"]} src={`${backURL + ad.image}`} alt="" />
            </div>
            
            <div className={css["product-info"]}>
                <h2 className={css["product-title"]}>{ad.title}</h2>
                <p><Icon icon="fa-clock-o" /><TimeAgo datetime={ad.timestamp}/></p>
                {/* add users location, unknown/private if null  */}
                <p><Icon icon="fa-map-marker" />Kaunas</p>
                {/* add category later */}
                <p><Icon icon="fa-tag" />Other</p>
                <p><Icon icon="fa-eye" />{ad.views} views</p>
            </div>
            <div className={css["product-footer"]}>
                <p className={`${css["product-price"]} ${isFree ? css["free-item"] : ''}`}>{isFree ? 'Free' : ad.price + ' €'}</p>
                <Icon icon={favorited ? "fa-heart" : "fa-heart-o"} onClick={() => setFavorited(!favorited)}/>
            </div>
        </div>
    );
}

export default Ad;
