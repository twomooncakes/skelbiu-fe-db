import { useEffect, useState } from "react";
import { useAuthCtx } from "../../store/AuthContext";
import { postData } from "../../utils/fetch";
import toast from 'react-hot-toast';
import Icon from "./Icon";

function Heart({listingId, likedBy}) {
    const [favorited, setFavorited] = useState(false);
    const { isLoggedIn, token, email } = useAuthCtx();

    const handleFavoriting = async () => {
        if(!isLoggedIn) {
            toast.error("Sign up/in to favorite listings!");
            return;
        }
        let fetchEndpoint = favorited ? `listings/unfavorite/${listingId}` : `listings/favorite/${listingId}`
        const favoriteData = await postData(fetchEndpoint, {}, token);
        console.log(favoriteData);
        if(favoriteData.msg === 'listing favorited') {
            setFavorited(true);
        } else setFavorited(false);
    }

    useEffect(() => {
        if(likedBy) {
            setFavorited(likedBy.split(',').includes(email));
        }
        return () => {
            setFavorited(false);
        }
    }, [])

    return (
        <Icon icon={favorited ? "fa-heart" : "fa-heart-o"} onClick={handleFavoriting}/>
    );
}

export default Heart;