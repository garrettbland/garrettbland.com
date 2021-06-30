require('dotenv').config()
const chalk = require('chalk')
const { Client } = require('@notionhq/client')

// Initialize notion client
const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})
const databaseId = process.env.NOTION_DATABASE_ID

module.exports = async function () {
    console.log(chalk.green('🚚 Getting posts from Notion...'))

    /**
     * Fetch list of posts from notion database and
     * where status is published & category is post
     */
    const posts = await notion.databases.query({
        database_id: databaseId,
        filter: {
            and: [
                {
                    property: 'Status',
                    select: {
                        equals: 'Published',
                    },
                },
                {
                    property: 'Category',
                    select: {
                        equals: 'Post',
                    },
                },
            ],
        },
        sorts: [
            {
                property: 'Published',
                direction: 'ascending',
            },
        ],
    })

    console.log(
        chalk.green(`📝 Retrieved ${posts.results.length} posts...`)
    )

    const pretty_results = await Promise.all(
        posts.results.map(async (post) => {
            return {
                id: post.id,
                title: post.properties.Title.title[0].text.content,
                blocks: await notion.blocks.children.list({
                    block_id: post.id,
                }),
            }
        })
    )

    return pretty_results
}
