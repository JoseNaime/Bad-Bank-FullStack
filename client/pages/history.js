import React, {useContext, useEffect, useState} from 'react';
import Head from "next/head";
import NavBar from "../components/NavBar";
import {GlobalContext} from "../components/GlobalProvider";
import {useRouter} from "next/router";

function History() {
    const {getUserParsed} = useContext(GlobalContext);
    const _user = getUserParsed();
    const [user, setUser] = useState({});
    const router = useRouter();

    useEffect(() => {
        console.log(user);
        if (!_user) {
            router.push('/login')
        } else {
            setUser(_user);
        }
    }, []);
    return (
        <div>
            <Head>
                <title>History | Bad Bank</title>
                <meta name="description" content="History of your Bad Bank" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
        </div>
    );
}

export default History;