<template>
    <div>
        <div class="mb-6">
            <h1 class="text-xl font-bold">
                Vue JS Kitchen Sink
            </h1>
            <img class="h-24 w-auto mb-6" src="https://vuejs.org/images/logo.png" />
            <p class="text-gray-800 mb-6">
                This page is a <a class="text-blue-500 hover:underline" target="_blank" href="https://vuejs.org/">Vue JS</a> app, and a kitchen sink of random things. This is
                using vue 2. Vue 3 is still in pre-alpha, and will test that
                out once its ready.
            </p>
            <p class="text-gray-800">
                This page is using a custom <code>.vue</code> component,
                and features <code>input binding</code>, <code>state</code>,
                <code>methods</code>, and some other general methods.
            </p>
        </div>
        <div class="mb-6">
            <button class="px-2 py-1 bg-gray-200 hover:bg-gray-300" v-on:click="showAlert">
                Show Window Alert
            </button>
        </div>
        <div class="mb-6">
            <p>
                Current Count: {{ currentCount }}
            </p>
            <button class="px-2 py-1 bg-gray-200 hover:bg-gray-300" v-on:click="currentCount ++">
                Add To Count
            </button>
        </div>
        <div class="mb-2">
            <div>
                First: <span class="font-bold">{{ me.first }}</span>
            </div>
            <div>
                Last: <span class="font-bold">{{ me.last }}</span>
            </div>
        </div>
        <div>
            <div class="mb-2">
                <label>First Name</label>
                <input v-model="me.first" class="px-2 py-1 border border-gray-300" placeholder="First Name"/>
            </div>
            <div>
                <label>Last Name</label>
                <input v-model="me.last" class="px-2 py-1 border border-gray-300" placeholder="Last Name"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'main-app',
        data () {
            return {
                me: {
                    first: 'Garrett',
                    last: 'Bland'
                },
                currentCount: 0
            }
        },
        methods: {
            showAlert() {
                alert('Show alert from vue')
            }
        }
    }
</script>
