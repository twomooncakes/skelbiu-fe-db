import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditAd from "../components/ad/EditAd";
import Button from "../components/UI/Button";
import { useAuthCtx } from "../store/AuthContext";
import { getData, postData } from "../utils/fetch";

function EditListingPage() {
    const { token } = useAuthCtx();
    const [listingInfo, setListingInfo] = useState([]);
    const { listingId } = useParams();

    const getListingInfo = async () => {
        const listingsData = await getData(`listings/${listingId}`, token);
        console.log(listingsData.data[0]);
        setListingInfo(listingsData.data[0]);
    };

    const handleDelete = async () => {
        console.log('delete ', listingId);
        const deleteData = await postData(`listings/delete/${listingId}`, {}, token);
        console.log(deleteData);
    }
    
    useEffect(() => {
        getListingInfo();
        return () => {
            setListingInfo([]);
        };
    }, []);

    return (
        <>
        {listingInfo.length === 0 ? <p className="main-msg">Listing is no longer available.</p> :
        <main>
            <div className="page-heading">
                <h1 className="page-title">Edit</h1>
                <Button clickFunc={handleDelete}>Delete Listing</Button>
            </div>
            <EditAd listingInfo={listingInfo} listingId={listingId}/>
        </main>}
        </>
    );
}

export default EditListingPage;