import AdList from "../components/ad/AdList";
import { useAuthCtx } from '../store/AuthContext';

function HomePage() {
    const { token } = useAuthCtx();
    return (
        <main>
            <h1 className="page-title">Home</h1>
            <AdList byToken={token} endpoint={token ? 'listings/all/authed' : 'listings/all'}/>
        </main>
    );
}

export default HomePage;