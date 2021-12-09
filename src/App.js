import './App.css';
import { Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from './pages/HomePage';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MyAdsPage from './pages/MyAdsPage';

function App() {
  return (
    <div className="App">
        <Toaster />
        <Header />
        <Switch>
            <Route path='/my-ads'>
                <MyAdsPage />
            </Route>
            <Route path='/register'>
                <RegisterPage />
            </Route>
            <Route path='/login'>
                <LoginPage />
            </Route>
            <Route exact path='/'>
                <HomePage />
            </Route>
            <Route path='*'>
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
