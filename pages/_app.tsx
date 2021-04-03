import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/tailwind.css'

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
                rel="stylesheet"
            />
        </Head>
        <Component {...pageProps} />
    </>
)

export default App
