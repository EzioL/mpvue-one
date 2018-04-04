<template>
  <div>
    <loading_loading></loading_loading>
    <ul class="container log-list">
      <li v-for="(log, index) in logs" :class="{ red: aa }" :key="index" class="log-item">
        <card :text="(index + 1) + ' . ' + log"></card>
      </li>
    </ul>
  </div>
</template>

<script>

  import loading_loading from '@/components/loading_loading'
  import {formatTime} from '@/utils/index'
  import card from '@/components/card'

  export default {
    components: {
      card,
      loading_loading
    },

    data() {
      return {
        logs: []
      }
    },

    created() {
      const logs = (wx.getStorageSync('logs') || [])
      this.logs = logs.map(log => formatTime(new Date(log)))
    }
  }
</script>

<style>
  .log-list {
    display: flex;
    flex-direction: column;
    padding: 40 rpx;
  }

  .log-item {
    margin: 10 rpx;
  }
</style>
