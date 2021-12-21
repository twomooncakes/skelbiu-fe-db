import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import EditAd from "../components/ad/EditAd";
import Button from "../components/UI/Button";
import { useAuthCtx } from "../store/AuthContext";
import { getData, postData } from "../utils/fetch";

function EditListingPage() {
    const { token } = useAuthCtx();
    const [listingInfo, setListingInfo] = useState([]);
    const { listingId } = useParams();
    const history = useHistory();

    const handleDelete = async () => {
        const deleteData = await postData(`listings/delete/${listingId}`, {}, token);
        if(deleteData.msg) {
            toast.success(deleteData.msg);
            history.push('/');
            return;
        }
    }
    
    useEffect(() => {
        const getListingInfo = async () => {
            const listingsData = await getData(`listings/${listingId}`, token);
            setListingInfo(listingsData.data[0]);
        };

        getListingInfo();

        return () => {
            setListingInfo([]);
        };
    }, [listingId, token]);

    return (
        <>
        {listingInfo.length === 0 ? <p className="main-msg">Listing is no longer available.</p> :
        <main>
            <div className="page-heading">
                <h1 className="page-title">Edit</h1>
                <div className="danger-btn">
                    <Button clickFunc={handleDelete}>Delete Listing</Button>
                </div>
                
            </div>
            <EditAd listingInfo={listingInfo} listingId={listingId}/>
        </main>}
        </>
    );
}

export default EditListingPage;