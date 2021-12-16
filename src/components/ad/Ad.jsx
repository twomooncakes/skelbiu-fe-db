import { useState, useEffect } from "react";
import Icon from "../UI/Icon";
import css from "./Ad.module.css";
import TimeAgo from 'timeago-react';
import { backURL, postData } from "../../utils/fetch";

function Ad({ad, email, token}) {
    const [favorited, setFavorited] = useState(false);

    const handleFavoriting = async () => {
        // currently only able to favorite, no reseting yet
        if(!favorited) {
            const favoriteData = await postData(`listings/favorite/${ad.id}`, {}, token);
            setFavorited(true);
        }
    }

    useEffect(() => {
        if(ad.likedBy) {
            setFavorited(ad.likedBy.split(',').includes(email));
        }
        return () => {
            setFavorited(false);
        }
    }, [])
    
    // free items distinct styling
    const isFree = parseInt(ad.price) === 0;
    
    return (
        <div className={css["ad-card"]}>
            <div className={css["product-image-wrapper"]}>
                <img className={css["product-image"]} src={`${backURL + ad.image}`} alt="" />
            </div>
            
            <div className={css["product-info"]}>
                <h2 className={css["product-title"]}>{ad.title}</h2>
                <p><Icon icon="fa-clock-o" /><TimeAgo datetime={ad.timestamp}/></p>
                {/* add users location later, unknown/private if null  */}
                <p><Icon icon="fa-map-marker" />Kaunas</p>
                <p><Icon icon="fa-tag" />{ad.category_name || 'Uncategorized'}</p>
                <p><Icon icon="fa-eye" />{ad.views} views</p>
            </div>
            <div className={css["product-footer"]}>
                <p className={`${css["product-price"]} ${isFree ? css["free-item"] : ''}`}>{isFree ? 'Free' : ad.price + ' €'}</p>
                {ad.seller !== email && <Icon icon={favorited ? "fa-heart" : "fa-heart-o"} onClick={handleFavoriting}/>}
            </div>
        </div>
    );
}

export default Ad;
