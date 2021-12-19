import { useParams } from "react-router-dom";
import TimeAgo from "timeago-react";
import { useAuthCtx } from "../../store/AuthContext";
import { backURL } from "../../utils/fetch";
import EditPencil from "../UI/EditPencil";
import Heart from "../UI/Heart";
import Icon from "../UI/Icon";
import css from "./SingleAd.module.css";

function SingleAd({listingInfo}) {
    const { image, likedBy, timestamp, category_name, price, description } = listingInfo;
    const { listingId } = useParams();
    const seller = listingInfo.email;
    const { email } = useAuthCtx();
    // free items distinct styling
    const isFree = parseInt(price) === 0;

    return (
        <article className={`${css.listing} card`}>
            <div className={css["image-wrapper"]}>
                <div className={css["image-container"]}>
                    <img src={`${backURL + image}`} alt="" />
                    <div className={css.heart}>
                        {seller === email ? <EditPencil listingId={listingId} /> :
                        <Heart listingId={listingId} likedBy={likedBy || false} /> }
                    </div>
                </div>
                
            </div>

            <section className={css["listing-content"]}>
                <div className={css["info-bar-header"]}>
                    <div className={css.meta}>
                        <p><Icon icon="fa-clock-o" /><TimeAgo datetime={timestamp}/></p>
                        <p><Icon icon="fa-tag" />{category_name || 'Uncategorized'}</p>
                        {/* <p><Icon icon="fa-eye" />{views} views</p> */}
                    </div>
                    <p className={`${css["listing-price"]} ${isFree ? css["free-item"] : ''}`}>{isFree ? 'Free' : price + ' €'}</p>
                </div>

                <p className={css.description}>{description}</p>
            </section>
        </article>
    );
}

export default SingleAd;