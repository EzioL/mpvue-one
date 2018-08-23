<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="content">
    <loading v-show="isLoading">数据加载中</loading>

    <!--上拉刷新-->
    <!--<div class="load-more" v-show="isRefresh">-->
    <!--<p class="load-more-toast"> 上拉刷新...</p>-->
    <!--</div>-->

    <!--专题列表-->
    <div class="article-list">
      <block>
        <div class="article" v-for="(article, index) in articles">
          <!--<img v-bind:src="article.cover" class="slide-image"/>-->
          <!--<p class="article-title">{{article.title}}</p>-->

          <CardTemplate :article="article"></CardTemplate>
        </div>
      </block>
    </div>


    <!--加载更多-->
    <div class="load-more" v-show="isLoadMore">
      <text class="load-more-toast"> 加载更多...</text>
    </div>
  </div>
</template>

<script>
  import {formatTime} from '@/utils/index'
  import CardTemplate from '@/components/CardTemplate'
  import request from '@/utils/request'

  export default {
    components: {
      CardTemplate
    },

    data() {
      return {
        firstRequestUrl: "https://api.qingmang.me/v2/article.list?token=c400a7e21688496ca3e7f17c6b0d1846&category_id=p2693",
        nextRequestUrl: "",
        articles: [],
        isRefresh: true,
        isLoading: false,
        isLoadMore: false
      }
    }, mounted() {
      console.log("mounted")

      //this.refresh()
      this.isLoading = true;
      this.getData(this.firstRequestUrl);

    }, onPullDownRefresh() {
      // 页面相关事件处理函数--监听用户下拉动作
      console.log("onPullDownRefresh")
      this.isLoading = true;
      this.refresh()

    }, onReachBottom() {
      // 页面上拉触底事件的处理函数
      console.log("onReachBottom")

      this.isLoadMore = true;

      this.getData(this.nextRequestUrl);

    }, onShareAppMessage: function () {
      // 用户点击右上角分享
      return {
        // title: '独唱团Lite', // 分享标题
        // desc: 'desc', // 分享描述
        path: 'pages/home/main' // 分享路径
      }
    }, methods: {
      getData: function (url) {
        console.debug("getData -- " + url);

        request.get(url).then(resp => {
          console.log("getData", resp)
          this.articles = this.articles.concat(resp.articles);
          if (resp.hasMore) {
            this.nextRequestUrl = resp.nextUrl;
          }

          this.isLoadMore = false;
          this.isLoading = false;
        })

      }, async refresh() {

      }
    }

  }
</script>

<style>
  .content {
    background: #eeeeee;
  }

  .article-list {
    margin-top: 0.75em;
  }

  .article {
    background: #fff;
    display: flex;
    flex-direction: column;
    /*padding: 1em;*/
    margin-bottom: 0.75em;
  }

  .load-more {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5em;
    background: #fff;
    justify-content: center;
    text-align:center;
  }

  .load-more-toast {
    width: 100%;
    font-size: 0.625em;
    color: #aaa;
    text-align:center;
  }
</style>
