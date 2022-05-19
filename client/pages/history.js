import React, {useContext, useEffect, useState} from 'react';
import Head from "next/head";
import NavBar from "../components/NavBar";
import {GlobalContext} from "../components/GlobalProvider";
import {useRouter} from "next/router";
import HistoryResume from "../components/HistoryResume";

function History() {
    const {getUserParsed} = useContext(GlobalContext);
    const _user = getUserParsed();
    const [user, setUser] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (_user) {
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
            <main>
                <div className="card">
                    <div className="card-content">
                        {user &&
                            <div>
                                <HistoryResume
                                    user={user}
                                    toResume={"withdrawals"}
                                    title={"Withdrawals History"} />
                                <HistoryResume
                                    user={user}
                                    toResume={"deposits"}
                                    title={"Deposits History"} />
                            </div>
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}

export default History;