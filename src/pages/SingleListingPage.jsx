import css from "./styles/SingleListingPage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SellerInfo from "../components/ad/SellerInfo";
import SingleAd from "../components/ad/SingleAd";
import { getData } from "../utils/fetch";
import { useAuthCtx } from "../store/AuthContext";

function SingleListingPage() {
    const { token } = useAuthCtx();
    const [listingInfo, setListingInfo] = useState([]);
    const { listingId } = useParams();
    const getListingInfo = async () => {
        let tokenArg = false;
        if (token) {
            tokenArg = token;
        }
        const listingsData = await getData(`listings/${listingId}`, tokenArg);
        console.log(listingsData);
        setListingInfo(listingsData.data[0]);
    };
    
    useEffect(() => {
        getListingInfo();
        return () => {
            setListingInfo([]);
        };
    }, []);

    return (
        <main>
            <h1>{listingInfo.title}</h1>
            <div className={css["single-listing-wrapper"]}>
                <SingleAd listingInfo={listingInfo} />
                <SellerInfo sellerInfo={listingInfo} />
            </div>
        </main>
    );
}

export default SingleListingPage;