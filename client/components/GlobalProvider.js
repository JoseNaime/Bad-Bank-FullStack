import {createContext, useState} from "react";

const initialState = {
    isLoggedIn: false,
    user: null,
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [ctx, setCtx] = useState(initialState);

    return (
        <GlobalContext.Provider value={{user: ctx.user, isLoggedIn: ctx.isLoggedIn}}>
            {children}
        </GlobalContext.Provider>
    )
}