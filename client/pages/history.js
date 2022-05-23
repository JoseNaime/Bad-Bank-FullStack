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
                <div id="history-container" className="card">
                    <div className="card-content">
                        {user &&
                            <div className="history-grid">
                                <div className="flex-horizontal">
                                    <HistoryResume
                                        className={"history-resume"}
                                        user={user}
                                        toResume={"withdrawals"}
                                        title={"Withdrawals"} />
                                    <HistoryResume
                                        className={"history-resume"}
                                        user={user}
                                        toResume={"deposits"}
                                        title={"Deposits"} />
                                </div>
                                <HistoryResume
                                    className={"history-resume"}
                                    user={user}
                                    toResume={"transfers"}
                                    title={"Transfers"} />
                            </div>
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}

export default History;