import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useHistory } from 'react-router';

const AuthContext = React.createContext({
    email: '',
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

function AuthProvider({ children }) {
    const history = useHistory();

    const [token, setToken] = useState(localStorage.getItem('userToken'));
    const [username, setUsername] = useState(localStorage.getItem('userEmail'));
    const isLoggedIn = !!token;

    const login = (tokenArg, emailArg, msg) => {
        localStorage.setItem('userToken', tokenArg);
        localStorage.setItem('userEmail', emailArg);
        setToken(tokenArg);
        setUsername(emailArg);
        toast.success(msg);
        history.push('/');
    };

    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userEmail');
        setToken(null);
        setUsername(null);
    };


    const finalContextValues = {
        token: token,
        isLoggedIn: isLoggedIn,
        username,
        login: login,
        logout: logout, 
    };
    return (
        <AuthContext.Provider value={finalContextValues}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export function useAuthCtx() {
    return useContext(AuthContext);
}