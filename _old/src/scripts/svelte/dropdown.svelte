<script>
    import Prism from 'prismjs'
    import { fade } from 'svelte/transition'
    import { dropdown } from './source_code'

    // dropdown items
    let items = [
        {
            title: 'What is Svelte?',
            description: 'Svelte is javascript framework.'
        },
        {
            title: 'What makes it special?',
            description: 'Its lightweight, simple to use, and fast.'
        },
        {
            title: 'Will Svelte take over the web?',
            description: 'Who knows, its possible.'
        }
    ]

    // set selected index initially
    let selectedIndex = 0

    // function to handle expanding item or closing if selected
    function handleExpand (index) {
        if(index === selectedIndex) {
            selectedIndex = null
        } else {
            selectedIndex = index
        }
    }

</script>

<div class="mb-6">
    <div>
        <p class="text-xl font-bold">
            Dropdown Test
        </p>
        <p class="text-gray-800 mb-6">
            This is a test component to use <code>events</code>, <code>loops</code>, <code>state</code>, built in transitions,
            and <code>if/else</code> statements with Svelte.
        </p>
    </div>
    <div>
        {#each items as item, index}
            <div class="bg-gray-200 mb-1">
                <div class="flex justify-between px-4 py-1">
                    <div class="flex flex-col">
                        <div>
                            {index + 1}. {item.title}
                        </div>
                    </div>
                    <button on:click="{() => handleExpand(index)}" class="focus:outline-none hover:underline">
                        {#if selectedIndex === index}
                            Close
                        {:else}
                            Expand
                        {/if}
                    </button>
                </div>
                {#if selectedIndex === index}
                    <div transition:fade class="px-4 pb-2">
                        <p class="text-gray-800 ml-4">
                            {item.description}
                        </p>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>

<div>
    <div>
        <p class="text-md font-bold">
            Source Code
        </p>
        <pre class="language-html">
            <code class="language-html">
                {dropdown}
            </code>
        </pre>
    </div>
</div>