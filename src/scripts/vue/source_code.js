export const kitchen = `
<template>
    <div>
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
                <input v-model="me.first" class="px-2 py-1 border border-gray-300" placeholder="First Name" />
            </div>
            <div>
                <label>Last Name</label>
                <input v-model="me.last" class="px-2 py-1 border border-gray-300" placeholder="Last Name" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'kitchen',
        data() {
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
                alert('Show alert from vue. Your name is '+this.me.first+' '+this.me.last)
            }
        }
    }
</script>`
