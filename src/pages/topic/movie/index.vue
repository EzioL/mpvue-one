<template>
    <div>
        <wxParse :content="html"></wxParse>

    </div>
</template>

<script>

    import wxParse from 'mpvue-wxparse'
    import request from '@/utils/request'


    export default {
        components: {
            wxParse
        },

        data () {
            return {
                html: '<div>我是HTML代码</div>'
            }
        },
        created () {
            //http://v3.wufazhuce.com:8000/api/movie/htmlcontent/1273
        }

    }
</script>

<style>

</style>
