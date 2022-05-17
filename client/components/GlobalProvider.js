import {createContext, useReducer} from "react";
import Cookies from "js-cookie";

const reducer = (state, action) => {
    switch (action.type) {
        case 'SAVE_USER':
            return {
                ...state,
                user: action.payload
            };
        case 'LOGIN':
            return {
                ...state,
                isLogin: true,
                user: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                isLogin: false,
                user: {}
            };
    }

}

const initialState = {
    isLoggedIn: false,
    user: {},
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(
        reducer,
        initialState,
        () => {
            const user = Cookies.get('user');
            return {
                isLoggedIn: !!user,
                user: user ? JSON.parse(user) : {},
            }
        });

    function login(user) {
        Cookies.set('user', JSON.stringify(user));
        dispatch({
            type: 'LOGIN',
            payload: user,
        });
    }

    function logout() {
        Cookies.remove('user');
        dispatch({
            type: 'LOGOUT',
        });
    }

    function saveUser(user) {
        Cookies.set('user', JSON.stringify(user));
        dispatch({
            type: 'SAVE_USER',
            payload: user,
        });
    }

    function getUserParsed() {
        const user = Cookies.get('user');
        if (user) {
            return JSON.parse(user);
        } else {
            return {};
        }
    }

    function getUserString() {
        const user = Cookies.get('user');
        if (user) {
            return user;
        } else {
            return '';
        }
    }

    return (
        <GlobalContext.Provider value={{
            login: login,
            logout: logout,
            getUserParsed: getUserParsed,
            getUserString: getUserString,
            saveUser: saveUser,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}