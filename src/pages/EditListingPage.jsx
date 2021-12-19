import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditAd from "../components/ad/EditAd";
import { useAuthCtx } from "../store/AuthContext";
import { getData } from "../utils/fetch";

function EditListingPage() {
    const { token } = useAuthCtx();
    const [listingInfo, setListingInfo] = useState([]);
    const { listingId } = useParams();

    const getListingInfo = async () => {
        const listingsData = await getData(`listings/${listingId}`, token);
        console.log(listingsData.data[0]);
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
            <h1>Edit</h1>
            <EditAd listingInfo={listingInfo} listingId={listingId}/>
        </main>
    );
}

export default EditListingPage;