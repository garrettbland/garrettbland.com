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
    const response = await notion.databases.query({
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
        chalk.green(
            `📝 Retrieved ${response.results.length} posts...`
        )
    )

    return response.results
}
