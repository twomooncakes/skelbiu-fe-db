import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthCtx } from "../../store/AuthContext";
import { getData } from "../../utils/fetch";
import toast from "react-hot-toast";
import Ad from "./Ad";
import css from "./AdList.module.css";

function AdList({ endpoint }) {
    const { token, email, logout } = useAuthCtx();
    const history = useHistory();
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const getListings = async () => {
            const listingsData = await getData(endpoint, token ? token : false);
            if (listingsData.error === "Bad token") {
                toast.error("Session has expired. Please login again");
                logout();
                history.push("/login");
                return;
            }
            setListings(listingsData.data);
        };
        
        getListings();

        return () => {
            setListings([]);
        };
    }, [endpoint, history, logout, token]);

    return (
        <>
        {listings.length > 0 ? (
            <section className={css.list}>
            {listings.map((listing) => <Ad key={listing.id} ad={listing} email={email} />)}
            </section>
        ) : (
            <p className="main-msg">No ads yet.</p>
        )}
        </>
    );
}

export default AdList;
