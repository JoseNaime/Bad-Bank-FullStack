import Head from 'next/head'
import {useRouter} from "next/router";
import NavBar from "../components/NavBar";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../components/GlobalProvider";
import CurrentBalance from "../components/CurrentBalance";

export default function Home() {
    const {getUserParsed} = useContext(GlobalContext);
    const _user = getUserParsed();
    const [user, setUser] = useState({});
    const router = useRouter();

    useEffect(() => {
        console.log(_user);
        if (!_user) {
            router.push('/login')
        } else {
            setUser(_user);
        }
    }, []);

    return (
        <div>
            <Head>
                <title>Home | Bad Bank</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <main>
                <div>
                    <h1>Welcome {user.name}</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi atque esse nobis quasi quia
                        recusandae sequi, sunt tempora. Ad adipisci alias facilis hic incidunt minima nemo praesentium
                        sit
                        sunt tempore!
                    </p>
                </div>

                <CurrentBalance user={user}/>
            </main>
        </div>
    )
}
