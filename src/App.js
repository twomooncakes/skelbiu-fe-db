import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthCtx } from "./store/AuthContext";
import HomePage from "./pages/HomePage";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListingPage from "./pages/CreateListingPage";
import MyAdsPage from "./pages/MyAdsPage";
import MyAccountPage from "./pages/MyAccount";
import EditProfileProvider from "./store/EditProfileContext";
import SingleListingPage from "./pages/SingleListingPage";
import UserListingsPage from "./pages/UserListingsPage";

function App() {
  const { isLoggedIn } = useAuthCtx();
  return (
    <div className="App">
      <Toaster />
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        
        <Route path="/listings/:listingId">
          <SingleListingPage />
        </Route>

        <Route path="/user/:userId">
          <UserListingsPage />
        </Route>

        {isLoggedIn && (
          <Route path="/account">
            <EditProfileProvider>
              <MyAccountPage />
            </EditProfileProvider>
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/my-ads">
            <MyAdsPage />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/create-listing">
            <CreateListingPage />
          </Route>
        )}

        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="*">
          <main>
            <h2>Page does not exist</h2>
          </main>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
