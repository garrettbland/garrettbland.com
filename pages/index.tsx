import Link from 'next/link'
import Layout from '../components/Layout'
import matter from 'gray-matter'

const Home = ({ posts }) => {
    return (
        <Layout>
            <div className="mt-6">
                <div>
                    <img
                        className="h-32 w-32 object-cover object-center rounded-lg mb-6 shadow-lg "
                        alt="Garrett Bland"
                        src="/images/garrett-bland-headshot.jpg"
                    />
                    <h1 className="font-bold">Hello! 👋</h1>
                    <p className="text-gray-800 mb-4">
                        I'm Garrett Bland, a full stack web developer with{' '}
                        <Link href="https://eagleradio.net" prefetch={false}>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Eagle Radio
                            </a>
                        </Link>{' '}
                        in Hays, Kansas. I manage our local news sites, as well as create client
                        websites. I develop heavily in Javascript, with an emphasis on React.
                    </p>
                    <p className="text-gray-800">
                        I'm an inspiring entreprenuer and love jumping into new things and learning.
                        I've created a handful of projects, working on a few new ones, and write
                        about development from time to time.
                    </p>
                </div>
                <div className="mt-6">
                    <div className="font-bold">Blog Posts 📝</div>
                    <ul>
                        {posts &&
                            posts.map((post) => {
                                if (!post.frontmatter.type) {
                                    return (
                                        <li key={post.slug}>
                                            <Link href={{ pathname: `/post/${post.slug}` }}>
                                                <a className="text-blue-500 hover:underline">
                                                    {post.frontmatter.pageTitle}
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                }
                            })}
                    </ul>
                </div>
                <div className="mt-6">
                    <div className="font-bold">My Projects 📦</div>
                    <ul>
                        {posts &&
                            posts.map((project) => {
                                if (project.frontmatter.type === 'project') {
                                    return (
                                        <li key={project.slug}>
                                            <Link href={{ pathname: `/post/${project.slug}` }}>
                                                <a className="text-blue-500 hover:underline">
                                                    {project.frontmatter.pageTitle}
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                }
                            })}
                    </ul>
                </div>
                <div className="mt-6">
                    <div className="font-bold">What is this site made with?</div>
                    <div className="text-gray-800 mb-4">
                        This site is being developed using{' '}
                        <Link href="https://nextjs.org/" prefetch={false}>
                            <a
                                className="text-blue-500 hover:underline"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Next.js
                            </a>
                        </Link>{' '}
                        The site is hosted on{' '}
                        <Link href="https://www.netlify.com/">
                            <a
                                className="text-blue-500 hover:underline"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Netlify
                            </a>
                        </Link>
                        , and for styling I am using{' '}
                        <Link href="https://tailwindcss.com/">
                            <a
                                className="text-blue-500 hover:underline"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Tailwind CSS.
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const posts = ((context) => {
        const keys = context.keys()
        const values = keys.map(context)

        /**
         * There has to be a better way to do this. Function
         * matter throws a fit about default not being part of
         * unkown from const value.
         */
        interface ValueType {
            default: string
        }

        const data = keys.map((key, index) => {
            let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
            const value: ValueType = values[index]['default']
            const document = matter<any, any>({
                content: value,
            })
            return {
                frontmatter: document.data,
                markdownBody: document.content,
                slug,
            }
        })
        return data
    })(require.context('../posts', true, /\.md$/))

    return {
        props: {
            posts,
        },
    }
}

export default Home
