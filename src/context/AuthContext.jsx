import React, { createContext, useState, useEffect, useContext } from 'react';

//context oluşturalım
 const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(
        {
        token: localStorage.getItem('token'),
        isAuthenticated: !!localStorage.getItem('token'),
            //Daha Temiz Kodu: !! operatörü, değerin Boolean karşılığını almanın kısa ve temiz bir yoludur.
    }
    );

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthState({ token:token, isAuthenticated: true });
        } else {
            setAuthState({ token: null, isAuthenticated: false });
        }
    }, [authState.token]); // Token değiştiğinde çalışır
    const login = (token) => {
        localStorage.setItem('token', token);
        setAuthState({ token, isAuthenticated: true });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({ token: null, isAuthenticated: false });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
