import { useEffect } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import prism from 'prismjs'

const BlogPost = ({ frontmatter, markdownBody }: { frontmatter: any; markdownBody: string }) => {
    useEffect(() => {
        prism.highlightAll()
    })

    if (!frontmatter) return <></>
    return (
        <Layout>
            <Link href="/">
                <a>Back to post list</a>
            </Link>
            <h1>{frontmatter?.pageTitle}</h1>
            <article id="article">
                <ReactMarkdown source={markdownBody} />
            </article>
        </Layout>
    )
}

export async function getStaticProps({ ...ctx }) {
    const { postname } = ctx.params

    const content = await import(`../../posts/${postname}.md`)
    // const config = await import(`../../siteconfig.json`)
    const data = matter(content.default)

    return {
        props: {
            // siteTitle: config.title,
            frontmatter: data.data,
            markdownBody: data.content,
        },
    }
}

export async function getStaticPaths() {
    const blogSlugs = ((context) => {
        const keys = context.keys()
        const data = keys.map((key, index) => {
            let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)

            return slug
        })
        return data
    })(require.context('../../posts', true, /\.md$/))

    const paths = blogSlugs.map((slug) => `/post/${slug}`)

    return {
        paths,
        fallback: false,
    }
}

export default BlogPost