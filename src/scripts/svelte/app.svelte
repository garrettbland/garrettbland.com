<script>
    import Dropdown from './dropdown.svelte'
</script>

<div>
    <div class="flex flex-wrap justify-between">
        <div class="w-full md:w-1/2">
            <h1 class="text-xl font-bold">
                Svelte Playground
            </h1>
            <p class="mb-6 text-gray-800">
                This page was built using <a class="text-blue-500 hover:underline" href="https://svelte.dev/">Svelte</a>. I'm using it to test
                out Svelte's chops and see how it would be useful.
            </p>
        </div>
        <img alt="Svelte Logo" class="w-full md:w-1/2" src="https://svelte.dev/svelte-logo-horizontal.svg"/>
    </div>
    <p class="mb-6 border-b-1 border-gray-500 text-gray-800">
        I've added Svelte into this website and this is currently
        the only page using it. I have a few demos below and some
        code examples.
    </p>
    <div class="h-px w-full bg-gray-200 mb-6"></div>
    <Dropdown/>
</div>