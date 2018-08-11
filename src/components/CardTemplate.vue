<template>
  <div class="card-box" v-on:click="routerDetail(article)">
    <img class="card-background-image" v-bind:src="article.covers[0].originalUrl"
         v-if="article.templateType == 'image'"/>
    <text class="card-article-title">{{article.title}}</text>
    <div class="card-article-snippet">{{article.snippet}}</div>
    <div class="card-article-leftTime">{{leftTime}}</div>
  </div>
</template>

<script>
  export default {
    props: ['article'],

    data() {
      return {
        imgUrl: "http://image.wufazhuce.com/FhUGpJBjkcod8DHH7OSieT-8ODKz", leftTime: ""

      }
    }, mounted() {
      this.leftTime = this.computeTime(this.article.publishTimestamp);
    }, methods: {
      routerDetail: function (article) {

        const articleId = "?articleId=" + article.articleId;
        const targetUrl = "/pages/detail/main" + articleId;
        console.log("targetUrl", targetUrl.toString())
        wx.navigateTo({
          url: targetUrl
        });

      }, getTimestamp: function (timestamp) {

      }, computeTime: function (timestamp) {
        var oldTime = timestamp;
        var currTime = new Date().getTime();
        var diffValue = currTime - oldTime;

        var days = Math.floor(diffValue / (24 * 3600 * 1000));
        if (days === 0) {
          //计算相差小时数
          var leave1 = diffValue % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
          var hours = Math.floor(leave1 / (3600 * 1000));
          if (hours === 0) {
            //计算相差分钟数
            var leave2 = leave1 % (3600 * 1000);  //计算小时数后剩余的毫秒数
            var minutes = Math.floor(leave2 / (60 * 1000));
            if (minutes === 0) {
              //计算相差秒数
              var leave3 = leave2 % (60 * 1000);   //计算分钟数后剩余的毫秒数
              var seconds = Math.round(leave3 / 1000);
              return seconds + '秒前';
            }
            return minutes + '分钟前';
          }
          return hours + '小时前';
        } else if (days < 8) {
          return days + '天前';
        } else {
          return this.formatTime(timestamp);
        }
      }, formatTime: function (timestamp) {

        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        return [year, month, day].map(this.formatNumber).join('/') + ' ' + [hour, minute].map(this.formatNumber).join(':')
      }, formatNumber: function (n) {
        n = n.toString();
        return n[1] ? n : '0' + n
      }
    },

  }

</script>

<style>
  div {
    display: block;
  }

  .card-box {
    position: relative;
    background-color: white;
    flex-direction: column;
    padding: 0.75em 1em 0.75em 1em;

  }

  .card-background-image {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    color: white;
    border-radius: 8px;
    background-repeat: no-repeat;
  }

  .card-article-title {
    font-size: 16px;
    margin-top: 8px;
    font-weight: bold;
    color: black;
  }

  .card-article-snippet {
    margin-top: 8px;
    font-size: 11px;
    color: #666666;
  }

  .card-article-leftTime {
    margin-top: 8px;
    font-size: 11px;
    color: #666666;
  }


</style>
