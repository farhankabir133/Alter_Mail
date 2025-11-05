import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useLocation } from 'wouter';
import { User } from '../types';
import * as api from '../api';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: (googleCredential: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [, setLocation] = useLocation();

    useEffect(() => {
        const validateSession = async () => {
            const token = localStorage.getItem('altmail-token');
            if (token) {
                try {
                    const currentUser = await api.getCurrentUser(token);
                    setUser(currentUser);
                } catch (error) {
                    console.error("Session validation failed", error);
                    localStorage.removeItem('altmail-token');
                }
            }
            setIsLoading(false);
        };

        validateSession();
    }, []);

    const handleAuthSuccess = (userData: User, token: string) => {
        setUser(userData);
        localStorage.setItem('altmail-token', token);
    };

    const login = async (email: string, password: string) => {
        const { user: userData, token } = await api.login(email, password);
        handleAuthSuccess(userData, token);
    };

    const loginWithGoogle = async (googleCredential: string) => {
        // The API now handles creating/updating the user and returns the definitive user object.
        const { user: userData, token } = await api.loginWithGoogle(googleCredential);
        handleAuthSuccess(userData, token);
    };
    
    const signup = async (email: string, password: string) => {
        const { user: userData, token } = await api.signup(email, password);
        handleAuthSuccess(userData, token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('altmail-token');
        setLocation('/');
    };

    const value = { 
        user, 
        isAuthenticated: !isLoading && !!user, // Only authenticated when not loading AND user exists
        isLoading, 
        login, 
        loginWithGoogle, 
        signup, 
        logout 
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};