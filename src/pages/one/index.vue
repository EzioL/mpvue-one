<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="content">
    <loading v-show="isLoading">数据加载中</loading>
    <div v-show="!isLoading">
      <!--还缺个头 日期 天气-->
      <div style="height: 48px;background-color: white" v-on:click="overShow = !overShow">
        <p>{{weather.date}}</p>
      </div>
      <!--遮罩层-->
      <div class="overlayer" v-if="overShow">
        <div style="height: 100%;width: 100%" v-for="n in 50">
          <p >{{ n }} </p>
        </div>
      </div>
      <!--插画-->
      <plate :plate="plate"></plate>
      <!--折叠面板-->
      <div style="margin: 20px 0;">
        <div class="panel-head" v-on:click="panelShow = !panelShow">独唱团 {{plate.volume}}
        </div>
        <!--<div class="panel-head" v-show="panelShow"> 展开</div>-->
        <div class="panel-content" v-if="panelShow" v-for=" content in contentList">
          <p>{{content.title}}</p>
        </div>

      </div>

      <!--内容列表-->
      <div v-for="">



      </div>



    </div>

  </div>
</template>

<script>

  import plate from '@/components/plate'

  import request from '@/utils/request'

  export default {
    components: {
      plate
    },

    data() {
      return {
        show: true, isLoading: true, overShow: false, panelShow: false, weather: {}, contentList: [], plate: {}, menu: {}
      }
    }, onLoad: function (options) {
      // 生命周期函数--监听页面加载
      this.getData();
    }, methods: {
      getData: function () {
        let url = "http://v3.wufazhuce.com:8000/api/channel/one/0/%E4%B8%8A%E6%B5%B7%E5%B8%82";
        request.get(url).then(data => {
          this.weather = data.data.weather;
          this.menu = data.data.menu;
          let list = data.data.content_list;
          console.log("content_list", list)
          for (let i = 0; i < list.length; i++) {
            if (i === 0) {
              this.plate = list[0];
            } else {
              this.contentList.push(list[i])
            }
          }

          this.isLoading = false;
        });

      },
    }
  }
</script>

<style>
  .content {
    /*background-color: #eeeeee;*/
    background-color: red;
  }

  .overlayer {
    position: fixed;
    left: 0;
    top: 45px;
    width: 100%;
    height: 100%;
    z-index: 100;
    overflow: scroll;
    background-color: rgba(255, 255, 255, 255);

  }

  .test {
    background: red;
    width: 100px;
    height: 100px;
    transition: all 1s;
    -moz-transition: all 1s;
    -webkit-transition: all 1s;
    -o-transition: all 1s;
  }

  .panel-head {
    background-color: aquamarine;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
    padding: 10px 0;
  }

  .panel-content {

    font-size: 16px;
    line-height: 20px;
    padding: 12px 0;
  }
</style>
