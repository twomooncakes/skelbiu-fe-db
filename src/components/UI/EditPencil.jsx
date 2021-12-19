import { Link } from "react-router-dom";
import Icon from "./Icon";

function EditPencil({listingId}) {
    return (
        <Link to={`/my-ads/edit/${listingId}`}>
            <Icon icon='fa-pencil' />
        </Link>   
    );
}

export default EditPencil;