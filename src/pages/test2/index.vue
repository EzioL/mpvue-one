<template>
  <div>
    <view class="swiper-tab">
      <view :class="{'swiper-tab-list':true,'on':currentTab===0 }" v-on:click="switchNav(0)">首页</view>
      <view :class="{'swiper-tab-list':true,'on':currentTab===1 }" v-on:click="switchNav(1)">阅读</view>
      <view :class="{'swiper-tab-list':true,'on':currentTab===2 }" v-on:click="switchNav(2)">音乐</view>
      <view :class="{'swiper-tab-list':true,'on':currentTab===3 }" v-on:click="switchNav(3)">电影</view>
    </view>

    <swiper :current="currentTab"  class="swiper-box" @change="bindSwiperChange">

      <swiper-item class="swiper-tab-list">

        <scroll-view scroll-x="false" scroll-y="true" class='scroll-views'>

          <block v-for="n in 100">首页{{n}}}</block>

        </scroll-view>
      </swiper-item>

      <swiper-item class="swiper-tab-list">
        <view v-for="n in 30">阅读{{n}}}</view>
      </swiper-item>

      <swiper-item class="swiper-tab-list">
        <view v-for="n in 30">音乐{{n}}}</view>
      </swiper-item>

      <swiper-item class="swiper-tab-list">
        <view v-for="n in 30">电影{{n}}}</view>
      </swiper-item>
    </swiper>

  </div>
</template>

<script>


  export default {
    components: {},

    data() {
      return {
        currentTab: 1,
      }
    }, created() {
    }, methods: {
      switchNav(tab) {
        if (this.currentTab !== tab) {
          this.currentTab = tab;
        }

      }, bindSwiperChange(event) {
        const current = event.mp.detail.current;
        if (this.currentTab !== current) {
          this.currentTab = current;
        }
      }
    }
  }
</script>

<style>
  .swiper-tab {
    width: 100%;
    border-bottom: 2 rpx solid #777777;
    /*text-align: center;*/
    line-height: 80 rpx;
  }

  .swiper-tab-list {
    font-size: 30 rpx;
    display: inline-block;
    width: 40px;
    padding: 6px 15px 6px 15px;
    color: #777777;
    overflow: scroll;
  }

  /*.swiper-box {*/
    /*background-color: aqua;*/
    /*overflow: scroll;*/
    /*!*display: block;*!*/
    /*!*height: 100%;*!*/
    /*!*width: 100%;*!*/
    /*!*overflow: hidden;*!*/
  /*}*/

  .swiper-box view {
    text-align: center;
  }


  .swiper-box{
    display: block;
    width: 100%;
    height: 100%;
    margin-top: 92rpx;
    overflow: hidden;
  }
  .swiper-items{
    height: 100%;
  }
  .scroll-views{
    height: 100%;
  }
</style>
