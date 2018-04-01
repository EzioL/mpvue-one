<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="content one-page-special-theme1" style="background-color:#D9EFE7;color:#244D83;">
        <!--header-->
        <div class="one-special-header-box one-page-header-image">
            <!--<div class="one-image-aspect-box" style="background-image:url(http://image.wufazhuce.com/FrNEUC7Tlv1CH5KzdFEXVYBgyvCL);"></div>-->
            <img class="one-image-aspect-box"
                 src="http://image.wufazhuce.com/FrNEUC7Tlv1CH5KzdFEXVYBgyvCL"/>
            <div class="one-image-aspect-mask"></div>
        </div>

        <!--title-->
        <div class="one-special-title-box">{{title}}
            <!--我觉得我爱上了你，也觉得现在应该是春天了-->
        </div>
        <div class="one-special-subtitle-box">
            春天就要来了，遇见你的春天，再也没有你的春天。
        </div>
        <div content="one-special-card-box">
            <block v-for="article in articles">
                <p>{{article.content_type}}</p>
                <movieCard :article="article" v-if="article.content_type == '5'"></movieCard>

            </block>
        </div>


    </div>
</template>

<script>
    import request from '@/utils/request'
    import superbridge from '@/utils/superbridge'


    import movieCard from '@/components/movieCard'

    export default {
        components: {
            movieCard
        },

        data () {
            return {
                title: '',
                desc: '',
                articles: [],
                content: {},
            }
        },

        mounted () {

        },
        onLoad: function (options) {
            // 生命周期函数--监听页面加载
            const content_id = options.content_id;
            console.log("onLoad", content_id)
            this.getHtmlContent(content_id)
        },
        methods: {
            getHtmlContent: function (content_id) {
                const url = 'http://v3.wufazhuce.com:8000/api/topic/htmlcontent/' + content_id;
                request.get(url).then(data => {
                    this.content = data.data;
                    this.title = this.content.title;
                    this.desc = this.content.share_list.wx.desc;
                    var split = this.content.html_content.split('/script>');
                    console.log("getHtmlContent", data.data)
                    split.forEach(s => {
                        if (s.indexOf('<script type="text/javascript">') > -1) {
                            var split2 = s.split('<script type="text/javascript">');
                            split2.forEach(s2 => {
                                if (s2.indexOf('display_category') > -1) {
                                    var split3 = s2.split(";");
                                    var split4 = split3[0].split("var oneDataArticles =");
                                    console.log("split4", split4.length)
                                    console.log("split4", split4[1].length)
                                    console.log("split4", JSON.parse(split4[1].toString()).length)
                                    //   console.log("split4",JSON.parse(split4[1].toString()))

                                    this.articles = JSON.parse(split4[1].toString());
                                    //console.log("articles", JSON.stringify(this.articles))
                                }
                            })
                        }
                    })
                    // this.html = data.data.html_content;
                    // console.log("Content", data.data.html_content)
                })

            },
        }
    }
</script>

<style>
    .content {
        background: #eeeeee;
        padding-bottom: 20px;
    }

    .one-page-special-theme1 .one-special-header-box {
        position: relative;
    }

    .one-page-special-theme1 .one-image-aspect-box {
        width: 100%;
    }

    .one-page-special-theme1 .one-image-aspect-mask {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-size: cover;
        background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, .2) 0%, rgba(0, 0, 0, .0) 100%);
    }

    .one-page-special-theme1 .one-special-title-box {
        margin-top: 30px;
        font-size: 24px;
        padding: 0 15px;
    }

    .one-page-special-theme1 .one-special-subtitle-box {
        font-size: 12px;
        line-height: 20px;
        padding: 0 15px;
    }

    .one-page-special-theme1 .one-special-card-box {
        position: relative;
        background-color: white;
        margin-top: 20px;
        border: 0.5px solid #D8D8D8;
        color: black;
        border-radius: 2px;
    }

</style>
