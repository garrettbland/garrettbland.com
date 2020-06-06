export const dropdown = `<script>
    import { fade } from 'svelte/transition'

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
            description: 'Use the right tool for the job is my motto. - Its totally possible. '
        }
    ]

    // set initial selected dropdown
    let selectedIndex = null

    // function to handle expansion or closing
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
            This is a test component to use button events, state, built in transitions,
            and if/else statements with Svelte.
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
</div>`
