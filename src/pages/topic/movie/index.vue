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
                data:{},
                html: '<div>我是HTML代码</div>'
            }
        },
        created () {

        },
        onLoad: function (options) {
            // 生命周期函数--监听页面加载
            //const content_id = options.content_id;
            const item_id = 1273;
            console.log("onLoad", item_id);
            this.getHtmlContent(item_id)
        },
        methods: {
            getHtmlContent: function (item_id) {
                const url = 'http://v3.wufazhuce.com:8000/api/movie/htmlcontent/' + item_id;

                request.get(url).then(data =>{

                    this.data = data.data;
//                    var h = data.data.html_content.toString().replaceAll("<!doctype html>","");
//                    console.log("h", h);
//                    this.html = "";
                   // this.html = '<div class="one-title-box">我觉得我爱上了你，也觉得现在应该是春天了</div>'
                });
            }

        }
    }
</script>

<style>

</style>
