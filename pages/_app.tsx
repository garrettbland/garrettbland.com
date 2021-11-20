import type { AppProps } from 'next/app'
/**
 * Leaving out tailwind to try css in js
 */
//import '../styles/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp