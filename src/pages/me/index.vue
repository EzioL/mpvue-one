<template>
    <div>
        <login ></login>
    </div>
</template>

<script>

    import loading_loading from '@/components/loading_loading'
    import {formatTime} from '@/utils/index'
    import login from '@/components/login'

    export default {
        components: {
            login,
            loading_loading
        },

        data() {
            return {
                logs: []
            }
        },

        created() {
            const logs = (wx.getStorageSync('logs') || [])
            this.logs = logs.map(log => formatTime(new Date(log)))
        }
    }
</script>

<style>
    .container {
        /*// background-color: #F4F3F7;*/
        /*background-color: blue;*/

    }
</style>
