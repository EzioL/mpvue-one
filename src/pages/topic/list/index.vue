<!--suppress ALL -->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="content one-page-special-theme1"
       v-bind:style="{ 'background-color':bg_color, 'color':font_color}">
    <loading v-show="isLoading">数据加载中</loading>
    <div class="content" v-show="!isLoading">
      <!--header-->
      <div class="one-special-header-box one-page-header-image">
        <img class="one-image-aspect-box" v-bind:src="cover"/>
        <div class="one-image-aspect-mask"></div>
      </div>
      <!--title-->
      <div class="one-special-title-box" v-if="title != ''">{{title}}</div>
      <div class="one-special-subtitle-box" v-if="desc != ''">{{desc}}</div>
      <div class="one-special-content-box" v-if="content != ''">{{content}}</div>
      <div content="one-special-card-box">
        <div v-for="article in articles" v-on:click="routerDetail(article)">
          <!--<p>{{article.content_type}}</p>-->
          <essayCard :article="article" v-if="article.content_type == '1'"></essayCard>
          <questionCard :article="article"
                        v-if="article.content_type == '3'"></questionCard>
          <musicCard :article="article" v-if="article.content_type == '4'"></musicCard>
          <movieCard :article="article" v-if="article.content_type == '5'"></movieCard>
          <!--2 8 -->
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import request from '@/utils/request'
  import superbridge from '@/utils/superbridge'

  import essayCard from '@/components/essayCard'
  import questionCard from '@/components/questionCard'
  import movieCard from '@/components/movieCard'
  import musicCard from '@/components/musicCard'

  export default {
    components: {
      movieCard, essayCard, questionCard, musicCard
    },

    data() {
      return {
        isLoading: true, bg_color: '', font_color: '', content: '', cover: '', title: '', desc: '', articles: [], data: {},
      }
    },

    mounted() {
    }, onLoad: function (options) {
      // 生命周期函数--监听页面加载
      const content_id = options.content_id;
      this.cover = options.cover;
      console.log("onLoad", content_id);
      console.log("cover", this.cover);
      this.getHtmlContent(content_id)
    }, methods: {
      getHtmlContent: function (content_id) {
        const url = 'http://v3.wufazhuce.com:8000/api/topic/htmlcontent/' + content_id;
        request.get(url).then(data => {
          this.data = data.data;
          this.bg_color = this.data.bg_color;
          this.font_color = this.data.font_color;
          this.title = this.data.title;
          console.log("getHtmlContent", data.data)
          //获取content 如果存在 desc 不赋值~ 就是这么奇怪
          var content = this.data.html_content.split('<div class="one-special-content-box">');
          var content1 = content[1].split('</div>');
          if (content1[0].toString().trim() === '') {
            this.desc = this.data.share_list.wx.desc;
            this.content = '';
          } else {
            this.content = content1[0];
            this.desc = '';
          }
          //从HTML获取数据 也是没办法的事情...
          var split = this.data.html_content.split('/script>');
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

          this.isLoading = false;
        })

      }, routerDetail(article) {
        // console.log("routerDetail", article)
        // const suffix = "?item_id=" + article.item_id;
        // var targetUrl = '';
        // if (article.content_type == 5) {
        //     targetUrl = "/pages/topic/movie/main";
        // }
        // targetUrl = targetUrl + suffix;
        // console.log("targetUrl", targetUrl.toString())
        // wx.navigateTo({
        //     url: targetUrl
        // });
        var c_type = "";
        if (article.content_type == 1) {
          c_type = "article"
        } else if (article.content_type == 3) {
          c_type = "question"
        } else if (article.content_type == 4) {

          c_type = "music"
        } else if (article.content_type == 5) {
          c_type = "movie"
        }
        const suffix = "?url=" + "http://m.wufazhuce.com" + "/" + c_type + "/"  +article.item_id;
        const targetUrl = "/pages/web/main" + suffix;
        console.log("targetUrl", targetUrl.toString())
        wx.navigateTo({
          url: targetUrl
        });

      }
    }
  }
</script>

<style>
  .content {
    padding-bottom: 20px;
  }

  .one-page-special-theme1 {
    background: #eeeeee;
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

  .one-page-special-theme1 .one-special-content-box {
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0 15px;
  }


</style>
