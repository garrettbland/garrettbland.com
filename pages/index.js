import Head from 'next/head'
import Layout from '../components/layout'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Garrett Bland</title>
            </Head>
            <Layout title="Garrett Bland">
                <div className="mt-6">
                    <div>
                        <h1 className="font-bold">Who am I?</h1>
                        <div className="text-gray-800">
                            I'm Garrett Bland, a full stack web
                            developer with{' '}
                            <a
                                className="text-blue-600 hover:underline"
                                href="https://eagleradio.net"
                            >
                                Eagle Radio
                            </a>{' '}
                            in Hays, Kansas. I manage our local news
                            sites, as well as create client websites.
                            I develop heavily in Javascript, with an
                            emphasis on React and Node.
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="font-bold">
                            Why is there nothing here?
                        </div>
                        <div className="text-gray-800">
                            Still very much in the works! (Also new to
                            writing on a normal basis) Check back soon
                            for updates.
                        </div>
                    </div>
                    <div className="mt-6">
                        <div className="font-bold">
                            What is this site made with?
                        </div>
                        <div className="text-gray-800">
                            This is a static site made with{' '}
                            <a
                                className="text-blue-600 hover:underline"
                                href="https://nextjs.org/"
                            >
                                Next JS
                            </a>{' '}
                            and hosted with{' '}
                            <a
                                className="text-blue-600 hover:underline"
                                href="https://netlify.com"
                            >
                                Netlify
                            </a>
                            . For styling, I used{' '}
                            <a
                                className="text-blue-600 hover:underline"
                                href="https://tailwindcss.com/"
                            >
                                Tailwind CSS
                            </a>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}
