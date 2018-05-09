<template style="overflow-x: auto">
  <view :scroll-y="true">
    <swiper style="height: 1300px;background-color: aqua" @change="bindDateChange">
      <swiper-item v-for=" n in num" :current = "now"
                   style="width: 100%;height:130%;background-color: #ff1b78">
        <view>{{n}}</view>
      </swiper-item>
      <!--<swiper-item style="width: 100%;height:130%;background-color: #ff73f0">-->
      <!--</swiper-item>-->
      <!--<swiper-item style="width: 100%;height:130%;background-color: #291cff">-->
      <!--</swiper-item>-->
      <!--<swiper-item style="width: 100%;height:130%;background-color: #e5ff1b">-->
      <!--</swiper-item>-->
      <!--<swiper-item style="width: 100%;height:130%;background-color: #ff4e6c">-->
      <!--</swiper-item>-->

    </swiper>

  </view>

</template>

<script>
  import {formatTime} from '@/utils/index'
  import card from '@/components/card'

  export default {
    components: {
      card
    },

    data() {
      return {
        num: 5,
        now:0,
      }
    },

    created() {
      const logs = (wx.getStorageSync('logs') || [])
      this.logs = logs.map(log => formatTime(new Date(log)))
    }, methods: {
      bindDateChange(event){
        const current = event.mp.detail.current;
        console.log("current--"+current  );
        console.log("now--"+this.now  );
        if (current + 2 > this.num) {
          console.log("最后一页");
          const n = this.num;
          this.num = n * 2;
        }
        if (current > 8 ) {

        }

      }
    }

  }
</script>

<style>
  page {
    background-color: aqua;
    overflow-x: auto;
  }

</style>
