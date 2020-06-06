import Prism from 'prismjs'
import App from './svelte/app.svelte'
import '../styles/main.css'

/**
 * get all <code></code> elements on page
 */
let code_blocks = document.getElementsByTagName('code')

/**
 * Create array from HTMLCollection an loop through
 */
Array.from(code_blocks).forEach(function (element) {
    element.innerHTML = element.innerHTML.replace(
        /[<]br[/]?[>]/gi,
        '\n'
    )
})

/**
 * Create new svelte app
 */
const app = new App({
    target: document.getElementById('svelte-test'),
    props: {
        color: 'red',
    },
})

export default app
