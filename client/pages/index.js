import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useContext, useEffect} from "react";
import {GlobalContext} from "../components/GlobalProvider";
import {useRouter} from "next/router";

export default function Home() {
    const {user} = useContext(GlobalContext)
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Bad Bank</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {user &&
                <main className={styles.main}>
                    <h1 className={styles.title}>{user.name}</h1>
                </main>}


        </div>
    )
}
