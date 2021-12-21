import css from "./styles/SingleListingPage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SellerInfo from "../components/ad/SellerInfo";
import SingleAd from "../components/ad/SingleAd";
import { getData } from "../utils/fetch";
import { useAuthCtx } from "../store/AuthContext";
import toast from "react-hot-toast";

function SingleListingPage() {
    const { token } = useAuthCtx();
    const [listingInfo, setListingInfo] = useState([]);
    const { listingId } = useParams();
    

    
    useEffect(() => {
        const getListingInfo = async () => {
            const listingsData = await getData(`listings/${listingId}`, token ? token : false);
            if(listingsData.error) {
                toast.error(listingsData.error)
                return;
            }
            if(listingsData.msg) {
                setListingInfo(listingsData.data[0]);
            }
            
        };

        getListingInfo();

        return () => {
            setListingInfo([]);
        };
    }, [listingId, token]);

    return (
        <main>
            <>
                {Object.entries(listingInfo).length === 0 || listingInfo.error ? <p className="main-msg">Listing is unavailable</p> : 
                    <>
                        <h1 className="page-title">{listingInfo.title}</h1>
                        <div className={css["single-listing-wrapper"]}>
                            <SingleAd listingInfo={listingInfo} />
                            <SellerInfo sellerInfo={listingInfo} />
                        </div>
                    </>
                }
            </>
        </main>
    );
}

export default SingleListingPage;