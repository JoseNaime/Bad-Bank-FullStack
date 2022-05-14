import {createContext, useReducer} from "react";
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
                user: null
            };
    }

}

const initialState = {
    isLoggedIn: false,
    user: null,
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
                user: user ? JSON.parse(user) : null,
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

    return (
        <GlobalContext.Provider value={{
            user: state.user,
            isLoggedIn: state.isLoggedIn,
            login: login,
            logout: logout
        }}>
            {children}
        </GlobalContext.Provider>
    )
}