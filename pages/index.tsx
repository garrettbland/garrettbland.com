import Link from 'next/link'
import Layout from '../components/Layout'
import matter from 'gray-matter'

const Home = ({ posts }) => {
    return (
        <Layout>
            <div className="mt-6 prose prose-blue">
                <div>
                    <img
                        className="h-32 w-32 object-cover object-center rounded-lg mb-6 shadow-lg"
                        alt="Garrett Bland"
                        src="/images/garrett-bland-headshot.jpg"
                    />
                    <h1>Hello! 👋</h1>
                    <p>
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
                    <p>
                        I'm an inspiring entreprenuer and love jumping into new things and learning.
                        I've created a handful of projects, working on a few new ones, and write
                        about development from time to time.
                    </p>
                </div>
                <div>
                    <h3>Blog Posts 📝</h3>
                    <ul>
                        {posts &&
                            posts.map((post) => {
                                if (!post.frontmatter.type) {
                                    return (
                                        <li key={post.slug}>
                                            <Link href={{ pathname: `/post/${post.slug}` }}>
                                                <a>{post.frontmatter.title}</a>
                                            </Link>
                                        </li>
                                    )
                                }
                            })}
                    </ul>
                </div>
                <div>
                    <h3>My Projects 📦</h3>
                    <ul>
                        {posts &&
                            posts.map((project) => {
                                if (project.frontmatter.type === 'project') {
                                    return (
                                        <li key={project.slug}>
                                            <Link href={{ pathname: `/post/${project.slug}` }}>
                                                <a>{project.frontmatter.title}</a>
                                            </Link>
                                        </li>
                                    )
                                }
                            })}
                    </ul>
                </div>
                <div>
                    <h3>What is this site made with?</h3>
                    <p>
                        This site is being developed using{' '}
                        <Link href="https://nextjs.org/" prefetch={false}>
                            <a target="_blank" rel="noreferrer">
                                Next.js
                            </a>
                        </Link>{' '}
                        The site is hosted on{' '}
                        <Link href="https://www.netlify.com/">
                            <a target="_blank" rel="noreferrer">
                                Netlify
                            </a>
                        </Link>
                        , and for styling I am using{' '}
                        <Link href="https://tailwindcss.com/">
                            <a target="_blank" rel="noreferrer">
                                Tailwind CSS.
                            </a>
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const posts = ((context) => {
        const keys = context.keys()
        const values = keys.map(context)

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
