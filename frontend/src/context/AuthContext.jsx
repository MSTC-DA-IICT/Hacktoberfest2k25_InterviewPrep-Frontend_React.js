/**
 * AUTH CONTEXT - Global authentication state management
 *
 * HACKTOBERFEST TODO:
 * This context manages user authentication state across the application.
 *
 * CONTRIBUTOR TASKS:
 * 1. Create AuthContext using createContext
 * 2. Create AuthProvider component that:
 *    - Manages user state
 *    - Manages loading state
 *    - Provides login function
 *    - Provides register function
 *    - Provides logout function
 *    - Checks for existing token on mount
 *    - Fetches user profile if token exists
 *
 * 3. Create useAuth custom hook for easy context access
 *
 * STATE TO MANAGE:
 * - user: User object or null
 * - token: JWT token string or null
 * - loading: Boolean
 * - isAuthenticated: Boolean (derived from user state)
 *
 * FUNCTIONS TO PROVIDE:
 * - login(credentials)
 * - register(userData)
 * - logout()
 * - checkAuth() - Verify token and fetch user
 */

import { createContext, useState, useContext, useEffect } from 'react';
import { login as loginApi, register as registerApi, logout as logoutApi, getProfile } from '../api/authApi';
import toast from 'react-hot-toast';

/**
 * TODO: CREATE AUTH CONTEXT
 *
 * Create context with default values
 */

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  isAuthenticated: false,
  login: () => {},
  register: () => {},
  logout: () => {},
  checkAuth: () => {},
});

/**
 * TODO: CREATE AUTH PROVIDER COMPONENT
 *
 * This component wraps the app and provides auth state and functions
 *
 * State:
 * - user: User object
 * - token: JWT token
 * - loading: Loading state
 *
 * Functions:
 * 1. login(credentials):
 *    - Call loginApi
 *    - Save token to state and localStorage
 *    - Save user to state
 *    - Show success toast
 *    - Handle errors
 *
 * 2. register(userData):
 *    - Call registerApi
 *    - Save token and user
 *    - Show success toast
 *    - Handle errors
 *
 * 3. logout():
 *    - Call logoutApi (clears localStorage)
 *    - Reset user and token state
 *    - Show success toast
 *    - Redirect to home
 *
 * 4. checkAuth():
 *    - Check if token exists in localStorage
 *    - If exists, fetch user profile
 *    - Update user state
 *    - Set loading to false
 *
 * useEffect:
 * - On mount, call checkAuth()
 *
 * EXAMPLE:
 * export const AuthProvider = ({ children }) => {
 *   const [user, setUser] = useState(null);
 *   const [token, setToken] = useState(localStorage.getItem('token'));
 *   const [loading, setLoading] = useState(true);
 *
 *   const login = async (credentials) => {
 *     try {
 *       const response = await loginApi(credentials);
 *       setToken(response.token);
 *       setUser(response.user);
 *       toast.success('Login successful!');
 *       return response;
 *     } catch (error) {
 *       toast.error(error.response?.data?.message || 'Login failed');
 *       throw error;
 *     }
 *   };
 *
 *   // ... other functions
 *
 *   useEffect(() => {
 *     checkAuth();
 *   }, []);
 *
 *   return (
 *     <AuthContext.Provider value={{ user, token, loading, isAuthenticated: !!user, login, register, logout }}>
 *       {children}
 *     </AuthContext.Provider>
 *   );
 * };
 */

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await loginApi(credentials);
      const { token, user } = response;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      toast.success('Login successful!');
      return response;
    } 
    catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
      throw error;
    } 
    finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerApi(userData);
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem('token', response.token);
      toast.success('Registration successful! You are now logged in.');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  // TODO: Implement logout function

  // TODO: Implement checkAuth function
  const checkAuth = async () => {
    // Check if token exists
    // If yes, fetch user profile
    // If successful, set user
    // Set loading to false
    setLoading(false);
  };

  // TODO: Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout: () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      toast.success('Logged out successfully');
    },
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * TODO: CREATE useAuth HOOK
 *
 * Custom hook to access auth context
 *
 * EXAMPLE:
 * export const useAuth = () => {
 *   const context = useContext(AuthContext);
 *   if (!context) {
 *     throw new Error('useAuth must be used within AuthProvider');
 *   }
 *   return context;
 * };
 *
 * USAGE:
 * const { user, login, logout, isAuthenticated } = useAuth();
 */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
