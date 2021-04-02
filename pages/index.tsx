import Link from 'next/link'
import Layout from '../components/Layout'

const Home = () => {
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
                    <div>
                        {/* {% for blog in collections.blogs %}
                <div>
                    <a className="text-blue-500 hover:underline" href="{{ blog.url }}">{{ blog.data.pageTitle }}</a>
                </div>
            {% endfor %} */}
                    </div>
                </div>
                <div className="mt-6">
                    <div className="font-bold">My Projects 📦</div>
                    <div>
                        {/* {% for project in collections.projects %}
                <div>
                    <a className="text-blue-500 hover:underline" href="{{ project.url }}">{{ project.data.pageTitle }}</a>
                </div>
            {% endfor %} */}
                    </div>
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

export default Home
