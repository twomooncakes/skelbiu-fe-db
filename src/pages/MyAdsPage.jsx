import AdList from "../components/ad/AdList";
import { useAuthCtx } from '../store/AuthContext';

function MyAdsPage() {
    const { token } = useAuthCtx();
    return (
        <main>
            <h1>My Ads</h1>
            <AdList byToken={token} endpoint='listings/user-listings'/>
        </main>
    );
}

export default MyAdsPage;