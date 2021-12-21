import AdList from "../components/ad/AdList";

function MyAdsPage() {
    return (
        <main>
            <h1 className="page-title">My Ads</h1>
            <AdList endpoint='listings/user-listings'/>
        </main>
    );
}

export default MyAdsPage;