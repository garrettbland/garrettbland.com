<template>
    <div>
        <div class="mb-6 flex flex-row flex-wrap justify-between">
            <div class="w-full md:w-4/5">
                <h1 class="text-xl font-bold">
                    Vue JS Kitchen Sink
                </h1>
                <p class="text-gray-800 md:pr-4">
                    This page is a <a class="text-blue-500 hover:underline" target="_blank" href="https://vuejs.org/">Vue JS</a> app,
                    and a kitchen sink of random things. This is
                    using vue 2. Vue 3 is still in pre-alpha, and will test that
                    out once its ready.
                </p>
            </div>
            <div class="w-full md:w-1/5">
                <img class="h-24 w-auto" src="https://vuejs.org/images/logo.png" />
            </div>
        </div>
        <div class="mb-6">
            <p class="text-gray-800 mb-6">
                I've used a ton of Vue js with a handful of client
                sites are using it in production. Its an absolutely
                wonderful experience and a lot of elements I prefer
                over React.
            </p>
            <p class="text-gray-800">
                This page is using a custom <code>.vue</code> component,
                and features <code>input binding</code>, <code>state</code>,
                <code>methods</code>, and some other general methods.
            </p>
        </div>
        <div class="mb-6">
            <Kitchen/>
        </div>
        <div class="h-px w-full bg-gray-200 mb-6"></div>
        <p class="text-md font-bold">
            Source Code
        </p>
        <div>
            <pre class="language-html">
                <code class="language-html">
                    {{ source_code }}
                </code>
            </pre>
        </div>
    </div>
</template>

<script>
    import Kitchen from './kitchen.vue'
    import { kitchen } from './source_code'
    export default {
        name: 'vue-app',
        data () {
            return {
                source_code: kitchen
            }
        },
        components: {
            Kitchen
        }
    }
</script>
