import { useState, useEffect } from "react";
import { useAuthCtx } from '../../store/AuthContext';
import { getData } from "../../utils/fetch";
import Ad from "./Ad";
import css from "./AdList.module.css";


function AdList({byToken, endpoint}) {
    const { token, email } = useAuthCtx();
    const [listings, setListings] = useState([]);

    const getListings = async () => {
        let tokenArg = false;
        if(byToken) {
            tokenArg = token;
        }
        const listingsData = await getData(endpoint, tokenArg);
        console.log(listingsData);
        setListings(listingsData.data);
    }

    useEffect(() => {
        getListings();
        return () => {
            setListings([]);
        }
    }, [])

    return (
        <section className={css.list}>
            {listings.map(listing => <Ad key={listing.id} ad={listing} email={email}/>)}
        </section>
    );
}

export default AdList;