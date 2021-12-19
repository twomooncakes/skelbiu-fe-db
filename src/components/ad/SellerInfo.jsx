import css from "./SellerInfo.module.css";
import TimeAgo from 'timeago-react';
import Button from "../UI/Button";

function SellerInfo({sellerInfo}) {
    const { email, city, phone, title } = sellerInfo;
    return (
        <section className={`${css["seller-info-wrapper"]} card`}>
            <h1 className={css.heading}>Seller's Information</h1>
            <h2 className={css.username}>{email}</h2>

            <ul className={css["seller-info-list"]}>
                <li><span>City:</span> {city ? city : 'Unspecified'}</li>
                <li><span>Phone:</span> {phone ? phone :'Unspecified'}</li>

                <li><span>Member since:</span> <TimeAgo datetime={sellerInfo.timestamp}/></li>
            </ul>

            <div className={css.actions}>
                <Button 
                    clickFunc={(e) => { 
                        window.location = `mailto:${email}?subject=${title}`; 
                        e.preventDefault(); 
                    }}
                >Contact Via Email</Button>
                
            </div>
            
        </section>
    );
}

export default SellerInfo;