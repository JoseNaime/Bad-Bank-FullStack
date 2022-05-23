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
        console.log(router.pathname);
        if (getUserString()) {
            setUser(_user);
        } else {
            router.push('/login')
        }
    }, [router]);

    const handleLogout = () => {
        logout()
        alert("You have been logged out")
        router.push('/login')
    }

    return (
        <nav id="navbar">
            <div className="container">
                <div id="navbar__left">
                    <p>Bad Bank</p>
                </div>
                <div id="navbar-links__container">
                    <Link href={'/'}>
                        <p className={router.pathname === "/" ? "active-link" : ""}>Home</p>
                    </Link>
                    <Link href={'/deposit'}>
                        <p className={router.pathname === "/deposit" ? "active-link" : ""}>Deposit</p>
                    </Link>
                    <Link href={'/withdraw'}>
                        <p className={router.pathname === "/withdraw" ? "active-link" : ""}> Withdraw </p>
                    </Link>
                    <Link href={'/transfer'}>
                        <p className={router.pathname === "/transfer" ? "active-link" : ""}>Transfer</p>
                    </Link>
                    <Link href={'/history'}>
                        <p className={router.pathname === "/history" ? "active-link" : ""}>History</p>
                    </Link>
                </div>
                <div id={"navbar__right"}>
                    <p>{user.name}</p>
                    <p onClick={handleLogout}>Log Out</p>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;