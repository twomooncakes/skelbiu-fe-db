import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthCtx } from '../../store/AuthContext';
import { getData } from "../../utils/fetch";
import toast from 'react-hot-toast';
import Ad from "./Ad";
import css from "./AdList.module.css";


function AdList({byToken, endpoint}) {
    const { token, email, logout } = useAuthCtx();
    const history = useHistory();
    const [listings, setListings] = useState([]);

    const getListings = async () => {
        let tokenArg = false;
        if(byToken) {
            tokenArg = token;
        }
        const listingsData = await getData(endpoint, tokenArg);
        console.log(listingsData);
        if(listingsData.error === "Bad token") {
            toast.error("Session has expired. Please login again");
            setListings([]);
            logout();
            history.push('/login');
            return;
        }
        setListings(listingsData.data);
    }

    useEffect(() => {
        getListings();
        return () => {
            setListings([]);
        }
    }, [])

    return (
        <>  
            {listings.length > 0 ? <section className={css.list}>
            {listings.map(listing => <Ad key={listing.id} ad={listing} token={token} email={email}/>)}
            </section> : <p className="main-msg">No ads yet.</p>}
            
        </>
    );
}

export default AdList;