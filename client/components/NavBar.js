import React, {useContext, useEffect, useState} from 'react';
import Link from "next/link";
import {GlobalContext} from "./GlobalProvider";
import {useRouter} from "next/router";

function NavBar(props) {
    const {getUserParsed, getUserString, logout} = useContext(GlobalContext)
    const _user = getUserParsed();
    const [user, setUser] = useState({});
    const router = useRouter()

    useEffect(() => {
        console.log(_user);
        if (getUserString()) {
            setUser(_user);
        } else {
            router.push('/login')
        }
    }, []);

    const handleLogout = () => {
        logout()
        alert("You have been logged out")
        router.push('/login')
    }

    return (
        <nav id="navbar">
            <div>
                <p>Bad Bank</p>
            </div>
            <div id="navbar-links__container">
                <Link href={'/'}>Home</Link>
                <Link href={'/deposit'}>Deposit</Link>
                <Link href={'/withdraw'}>Withdraw</Link>
                <Link href={'/history'}>History</Link>
            </div>
            <div className={"navbar__right"}>
                <p>{user.name}</p>
                <p onClick={handleLogout}>Log Out</p>
            </div>

        </nav>
    );
}

export default NavBar;