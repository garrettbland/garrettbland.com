const chalk = require('chalk')
const matter = require('gray-matter')
const fs = require('fs')
const PROJECTS_DIR = './cms/projects'

/**
 * Retrieve all projects from PROJECTS_DIR and returns the gray matter object from string
 */
console.log(chalk.green('🚚 Getting projects from cms/projects...'))

const projects = fs
    .readdirSync(PROJECTS_DIR, {
        withFileTypes: true,
    })
    .filter((item) => !item.isDirectory())
    .map((item) => matter.read(`${PROJECTS_DIR}/${item.name}`))
    .filter((item) => item.data.active)

console.log(
    chalk.green(`📝 Retrieved ${projects.length} projects...`)
)

module.exports = projects
