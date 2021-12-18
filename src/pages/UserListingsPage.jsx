import AdList from "../components/ad/AdList";
import { useAuthCtx } from '../store/AuthContext';

function UserListingsPage() {
    const { token } = useAuthCtx();
    
    return (
        <main>
            <h1>User Listings</h1>
            <AdList byToken={token} endpoint={token ? 'listings/all/authed' : 'listings/all'}/>
        </main>
    );
}

export default UserListingsPage;