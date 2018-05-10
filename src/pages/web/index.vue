<template>
  <div>
    <web-view :src="url"></web-view>

  </div>
</template>

<script>
  import {formatTime} from '@/utils/index'
  import card from '@/components/card'

  export default {
    components: {
    },

    data() {
      return {
        url: ""
      }
    },onLoad: function (options) {
      // 生命周期函数--监听页面加载
      this.url = options.url;
      console.log("onLoad",  options.url);

    }
  }
</script>

<style>

</style>
