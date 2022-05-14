import React, {useContext} from 'react';
import Link from "next/link";
import {GlobalContext} from "./GlobalProvider";
import {useRouter} from "next/router";

function NavBar(props) {
    const {logout} = useContext(GlobalContext)
    const router = useRouter()

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
            <div>
                <p onClick={handleLogout}>Log Out</p>
            </div>

        </nav>
    );
}

export default NavBar;