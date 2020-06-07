import Prism from 'prismjs'
import Svelte from './svelte/app.svelte'
import Vue from 'vue'
import VueApp from './vue/app.vue'
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
new Svelte({
    target: document.getElementById('svelte-test'),
    props: {
        color: 'red',
    },
})

/**
 * Create new vue app
 */
new Vue({
    render: (h) => h(VueApp),
}).$mount('#vue-test')
