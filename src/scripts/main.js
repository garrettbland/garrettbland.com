import Prism from 'prismjs'
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
