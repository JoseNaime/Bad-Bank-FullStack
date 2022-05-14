import {createContext, useEffect, useReducer} from "react";
import Cookies from "js-cookie";

const reducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                isLogin: true,
                user: action.payload
            };
        case 'logout':
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

    useEffect(() => {
        console.log(state)
    })

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
            return {};
        }
    }

    return (
        <GlobalContext.Provider value={{
            login: login,
            logout: logout,
            getUserParsed: getUserParsed,
            getUserString: getUserString,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}