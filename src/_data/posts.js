const chalk = require('chalk')
const { Client } = require('@notionhq/client')

module.exports = async function () {
    console.log(chalk.green('🚚 Getting posts from Notion...'))

    return [
        {
            title: 'Title of post',
        },
    ]
}
