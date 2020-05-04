import Head from 'next/head'
import Layout from '../../components/layout'
import Header from '../../components/header'

export default function Post() {
    return (
        <div>
            <Head>
                <title>My new site | Garrett Bland</title>
            </Head>
            <Layout title="My new site">
                <Header title="Welcome to my new site" />
                <div>This will be a post eventually</div>
            </Layout>
        </div>
    )
}
