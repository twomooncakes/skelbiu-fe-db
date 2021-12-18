import Icon from "../UI/Icon";
import css from "./Ad.module.css";
import TimeAgo from 'timeago-react';
import { backURL } from "../../utils/fetch";
import Heart from "../UI/Heart";
import { Link } from "react-router-dom";

function Ad({ad, email}) {

    const handleEdit = async () => {
        console.log('edit');
    }

    // free items distinct styling
    const isFree = parseInt(ad.price) === 0;
    
    return (
        <div className={css["ad-card"]}>
            <Link to={`/listings/${ad.id}`}>
                <div className={css["product-image-wrapper"]}>
                    <img className={css["product-image"]} src={`${backURL + ad.image}`} alt="" />
                </div>
                
                <div className={css["product-info"]}>
                    <h2 className={css["product-title"]}>{ad.title}</h2>
                    <p><Icon icon="fa-clock-o" /><TimeAgo datetime={ad.timestamp}/></p>
                    <p><Icon icon="fa-map-marker" />{ad.city ? ad.city : 'Unspecified'}</p>
                    <p><Icon icon="fa-tag" />{ad.category_name || 'Uncategorized'}</p>
                    <p><Icon icon="fa-eye" />{ad.views} views</p>
                </div>
            </Link>
            <div className={css["product-footer"]}>
                {/* Link is necessary in order to like page in list view without going into single listing page */}
                <Link to={`/listings/${ad.id}`}>
                <p className={`${css["product-price"]} ${isFree ? css["free-item"] : ''}`}>{isFree ? 'Free' : ad.price + ' €'}</p>
                </Link>
                {ad.seller === email ? <Icon icon='fa-pencil' onClick={handleEdit}/> : <Heart listingId={ad.id} likedBy={ad.likedBy} />}
            </div>
        </div>
    );
}

export default Ad;
