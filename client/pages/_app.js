import '../styles/globals.css'
import {GlobalProvider} from "../components/GlobalProvider";

function MyApp({Component, pageProps}) {
    return (
        <GlobalProvider>
            <Component {...pageProps} />
        </GlobalProvider>
    )
}

export default MyApp
